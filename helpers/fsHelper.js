const fs = require("fs")
const Poller = require("../utils/Poller")

const checkForFile = (directory, fileName) => {
  const getDirContents = () => fs.existsSync("./tmp") && fs.readdirSync("./tmp")

  const checkFileExists = (dirContents) => dirContents && dirContents.includes(fileName)

  const options = {
    timeout: 5000,
    delay: 100,
    name: "fs check for file",
    condition: checkFileExists
  }

  return new Poller(getDirContents)
    .poll(options)
    .then(() => true)
    .catch((error) => error)
}

module.exports = {
  checkForFile
}
