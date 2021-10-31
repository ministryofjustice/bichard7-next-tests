const axiosClass = require("axios").default;
const https = require("https");
const fs = require("fs");
const parser = require("fast-xml-parser");
const Poller = require("../utils/Poller");
const isError = require("../utils/isError");

const axios = axiosClass.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});
const axiosConfig = { validateStatus: false };
const updateExpectations = process.env.UPDATE_PNC_EXPECTATIONS === "true";

const extractNamesFromNCM = (ncmFile) => {
  const xmlData = fs.readFileSync(ncmFile, "utf8").toString();

  const parsed = parser.parse(xmlData);
  const surname =
    parsed.NewCaseMessage.Case.Defendant.PoliceIndividualDefendant.PersonDefendant.BasePersonDetails.PersonName
      .PersonFamilyName;
  const forename =
    parsed.NewCaseMessage.Case.Defendant.PoliceIndividualDefendant.PersonDefendant.BasePersonDetails.PersonName
      .PersonGivenName1;
  return { forename, surname };
};

const extractNamesFromMessage = (messageFile) => {
  const xmlData = fs.readFileSync(messageFile, "utf8").toString();

  const parsed = parser.parse(xmlData);
  const surname =
    parsed.DeliverRequest.Message["DC:ResultedCaseMessage"]["DC:Session"]["DC:Case"]["DC:Defendant"][
      "DC:CourtIndividualDefendant"
    ]["DC:PersonDefendant"]["DC:BasePersonDetails"]["DC:PersonName"]["DC:PersonFamilyName"];
  const forename =
    parsed.DeliverRequest.Message["DC:ResultedCaseMessage"]["DC:Session"]["DC:Case"]["DC:Defendant"][
      "DC:CourtIndividualDefendant"
    ]["DC:PersonDefendant"]["DC:BasePersonDetails"]["DC:PersonName"]["DC:PersonGivenName1"];
  return { forename, surname };
};

const removeVariableData = (data, format) => {
  // Remove the data that changes each time
  if (format === "html") {
    return data
      .replace(/Print of PNC Record: [^<]*</g, "Print of PNC Record: XXXX/XX<")
      .replace(/CCRef: <\/strong>[^<]*</g, "CCRef: </strong>XX/XXXX/XX<");
  }
  return data
    .replace(/PNCID="[^"]*"/g, 'PNCID="XXXX/XX"')
    .replace(/COURT-CASE-REF="[^"]*"/g, 'COURT-CASE-REF="XX/XXXX/XX"')
    .replace(/\s+<GMH.*\/>/g, "")
    .replace(/\s+<GMT.*\/>/g, "");
};

class PNCTestTool {
  constructor(options) {
    this.options = options;
    if (!options.baseUrl) {
      throw new Error("Error: PNC_TEST_TOOL environment variable is not set");
    }
    this.baseUrl = options.baseUrl;
  }

  async setupRecord(specFolder) {
    let name;
    let existingRecord;
    const ncmFile = `${specFolder}/pnc-data.xml`;
    const messageFile = `${specFolder}/input-message.xml`;

    if (fs.existsSync(ncmFile)) {
      name = extractNamesFromNCM(ncmFile);
    } else {
      name = extractNamesFromMessage(messageFile);
    }

    // Check if it exists first
    existingRecord = await this.fetchRecord(name, "xml");

    if (fs.existsSync(ncmFile) && !existingRecord) {
      // Insert the record
      await this.createRecord(ncmFile);
      existingRecord = await this.fetchRecord(name, "xml");
    }

    // Check it matches our expected start state
    if (!existingRecord || isError(existingRecord)) throw new Error("Could not fetch record from PNC");
    // Remove the tags that change each time

    const beforePath = `${specFolder}/pnc-data.before.xml`;
    if (updateExpectations) {
      fs.writeFileSync(beforePath, existingRecord);
      // Fetch the HTML version too for easier comparison
      const existingRecordHTML = await this.fetchRecord(name, "html");
      fs.writeFileSync(beforePath.replace(".xml", ".html"), existingRecordHTML);
    }
    const beforeState = fs.readFileSync(beforePath).toString();
    if (existingRecord !== beforeState) {
      throw new Error("PNC record does not match expected before state");
    }
  }

  async checkRecord(specFolder) {
    let name;
    const ncmFile = `${specFolder}/pnc-data.xml`;
    const messageFile = `${specFolder}/input-message.xml`;
    if (fs.existsSync(ncmFile)) {
      name = extractNamesFromNCM(ncmFile);
    } else {
      name = extractNamesFromMessage(messageFile);
    }

    // Retrieve the record
    const record = await this.fetchRecord(name, "xml");
    if (!record || isError(record)) throw new Error("Could not fetch record from PNC");

    const afterPath = `${specFolder}/pnc-data.after.xml`;
    if (updateExpectations) {
      fs.writeFileSync(afterPath, record);
      // Fetch the HTML version too for easier comparison
      const recordHTML = await this.fetchRecord(name, "html");
      fs.writeFileSync(afterPath.replace(".xml", ".html"), recordHTML);
    }

    const afterState = fs.readFileSync(afterPath).toString();
    return record === afterState;
  }

  async fetchRecord(options, format) {
    const action = async () => {
      const url = `${
        this.baseUrl
      }/query.php?forename=${options.forename.toUpperCase()}&surname=${options.surname.toUpperCase()}&format=${format}`;

      try {
        return await axios.get(url, { ...axiosConfig, timeout: 1000 });
      } catch (err) {
        return -100;
      }
    };

    const condition = (resp) => resp.status === 200 || resp.status === 404;

    return new Poller(action)
      .poll({
        condition,
        timeout: 10000,
        delay: 1000,
        name: "PNC Test Tool query request poller"
      })
      .then(({ status, data }) => {
        if (status === 200) {
          return removeVariableData(data, format);
        }
        return false;
      })
      .catch((error) => error);
  }

  async createRecord(ncmFile) {
    const xmlData = fs.readFileSync(ncmFile, "utf8").toString();
    const url = `${this.baseUrl}/create.php`;
    try {
      await axios.post(url, xmlData, { timeout: 5000 });
    } catch (err) {
      console.log(err.message);
      throw new Error("Error creating record in PNC");
    }
  }
}

module.exports = PNCTestTool;
