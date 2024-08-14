const fs = require("fs")

const reasonCode = process.argv[2]
const messageContent = fs.readFileSync(`./scripts/uat-data/${reasonCode}/message-content.xml`, { encoding: "utf8" })
const escapedMessage = messageContent
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replace(/\t/g, "")
  .replace(/(\r\n|\n|\r)/gm, "")

fs.writeFileSync(`./scripts/uat-data/${reasonCode}/escaped-message-content.xml`, escapedMessage)
