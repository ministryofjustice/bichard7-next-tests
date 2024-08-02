const { XMLParser } = require("fast-xml-parser")
const ActiveMqHelper = require("../helpers/ActiveMqHelper")

const parser = new XMLParser()

const processNameValuePairs = (nvp) => nvp.nameValuePair

const processLog = (log) => {
  const parsed = parser.parse(log)
  const event = parsed.logEvent ? parsed.logEvent : parsed.auditEvent

  return {
    componentId: event.componentId,
    eventType: event.eventType,
    receivedAt: new Date(event.eventDateTime),
    nameValuePairs: processNameValuePairs(event.nameValuePairs)
  }
}

const dateSort = (a, b) => a.receivedAt.getTime() - b.receivedAt.getTime()

const processLogs = (logs) => logs.map(processLog).sort(dateSort)

const readLogs = async () => {
  const mq = new ActiveMqHelper({
    url: process.env.MQ_URL || "failover:(stomp://localhost:61613)",
    login: process.env.MQ_USER || "admin",
    password: process.env.MQ_PASSWORD || "admin"
  })

  const generalLogs = await mq.getMessages("GENERAL_EVENT_QUEUE")
  const auditLogs = await mq.getMessages("AUDIT_EVENT_QUEUE")
  const allLogs = generalLogs.concat(auditLogs)

  mq.client.disconnect()
  return processLogs(allLogs)
}

readLogs()
  .then((messages) => {
    if (messages.length > 0) {
      console.log(JSON.stringify(messages, null, 2))
    }
  })
  .catch((e) => console.error(e))
