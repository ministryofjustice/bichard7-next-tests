const axiosClass = require("axios").default;
const https = require("https");

const axios = axiosClass.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});
const axiosConfig = { validateStatus: false };
const fs = require("fs");
const path = require("path");
const parser = require("fast-xml-parser");
const Poller = require("../utils/Poller");

const updateExpectations = process.env.UPDATE_PNC_EXPECTATIONS === "true";
const isError = require("../utils/isError");

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

const removeVariableData = (data, format) => {
  if (format === "html") {
    return data
      .replace(/Print of PNC Record: [^<]*</g, "Print of PNC Record: XXXX/XX<")
      .replace(/CCRef: <\/strong>[^<]*</g, "CCRef: </strong>XX/XXXX/XX<");
  }
  return data
    .replace(/PNCID="[^"]*"/g, 'PNCID="XXXX/XX"')
    .replace(/COURT-CASE-REF="[^"]*"/g, 'COURT-CASE-REF="XX/XXXX/XX"');
};

class PNCTestTool {
  constructor(options) {
    this.options = options;
    if (!options.baseUrl) {
      throw new Error("Error: PNC_TEST_TOOL environment variable is not set");
    }
    this.baseUrl = options.baseUrl;
  }

  async insertRecord(ncmFile) {
    if (fs.existsSync(ncmFile)) {
      // Record needs inserting
      const name = extractNamesFromNCM(ncmFile);
      // Check if it exists first
      let existingRecord = await this.fetchRecord(name, "xml");
      if (!existingRecord) {
        console.log("Record does not exist");
        // Insert the record
        await this.createRecord(ncmFile);
        existingRecord = await this.fetchRecord(name, "xml");
      }
      // Check it matches our expected start state
      if (!existingRecord || isError(existingRecord)) throw new Error("Record does not exist in PNC");
      // Remove the tags that change each time
      try {
        existingRecord = existingRecord.replace(/\s+<GMH.*\/>/g, "").replace(/\s+<GMT.*\/>/g, "");
      } catch (err) {
        console.log(existingRecord);
        throw err;
      }
      const beforePath = `${path.dirname(ncmFile)}/pnc-data.before.xml`;
      if (updateExpectations) {
        fs.writeFileSync(beforePath, existingRecord);
        // Fetch the HTML version too for easier comparison
        const existingRecordHTML = await this.fetchRecord({ pncId: this.pncId }, "html");
        fs.writeFileSync(beforePath.replace(".xml", ".html"), existingRecordHTML);
      }
      const beforeState = fs.readFileSync(beforePath).toString();
      if (existingRecord !== beforeState) {
        throw new Error("PNC record does not match expected before state");
      }
    } else {
      // Record already exists in PNC
    }
  }

  async checkRecord(ncmFile) {
    const name = extractNamesFromNCM(ncmFile);
    // Retrieve the record
    let record = await this.fetchRecord(name, "xml");
    if (!record || isError(record)) throw new Error("Record does not exist in PNC");
    // Remove the tags that change each time
    try {
      record = record.replace(/\s+<GMH.*\/>/g, "").replace(/\s+<GMT.*\/>/g, "");
    } catch (err) {
      console.log(record);
      console.log(err.message);
      throw new Error("Error fetching record");
    }
    const afterPath = `${path.dirname(ncmFile)}/pnc-data.after.xml`;
    if (updateExpectations) {
      fs.writeFileSync(afterPath, record);
      // Fetch the HTML version too for easier comparison
      const recordHTML = await this.fetchRecord({ pncId: this.pncId }, "html");
      fs.writeFileSync(afterPath.replace(".xml", ".html"), recordHTML);
    }

    const afterState = fs.readFileSync(afterPath).toString();
    return record === afterState;
  }

  async fetchRecord(options, format) {
    const action = async () => {
      let url;
      if (format === "xml") {
        url = `${
          this.baseUrl
        }/query.php?forename=${options.forename.toUpperCase()}&surname=${options.surname.toUpperCase()}`;
      } else if (format === "html") {
        url = `${this.baseUrl}/PNCID_Request_Display.php?var1=${options.pncId}&var2=CDPP`;
      }
      try {
        const resp = await axios.get(url, { ...axiosConfig, timeout: 1000 });
        return resp;
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
          if (format === "xml") {
            // eslint-disable-next-line prefer-destructuring
            this.pncId = data.match(/PNCID="([^"]*)"/)[1];
          }
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
