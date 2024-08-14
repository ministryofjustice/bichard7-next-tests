const fs = require("fs")
const { XMLParser } = require("fast-xml-parser")

const reasonCode = process.argv[2]
const incomingMessage = fs.readFileSync(`./scripts/uat-data/${reasonCode}/incoming-message.xml`, { encoding: "utf8" })
const parser = new XMLParser()
const message = parser.parse(incomingMessage)
fs.writeFileSync(`./scripts/uat-data/${reasonCode}/message-content.xml`, message.RouteData.DataStream.DataStreamContent)
