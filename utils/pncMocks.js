const fs = require("fs");
const uuid = require("uuid").v4;
const parser = require("fast-xml-parser");

const yearPNC = "11";
const forcePNC = "01";
const unitPNC = "ZD";
const systemPNC = "01";
const sequencePNC = parseInt(Math.random() * 899999, 10) + 100000;

const reformatDate = (input) => {
  const res = input.match(/(\d{4})-(\d{2})-(\d{2})/);
  return `${res[3]}${res[2]}${res[1]}`.padEnd(12, "0");
};

const extractDates = (offence) => {
  const startDate = reformatDate(offence.BaseOffenceDetails.OffenceTiming.OffenceStart.OffenceDateStartDate);
  let endDate;

  if (
    offence.BaseOffenceDetails.OffenceTiming.OffenceEnd &&
    offence.BaseOffenceDetails.OffenceTiming.OffenceEnd.OffenceEndDate
  ) {
    endDate = reformatDate(offence.BaseOffenceDetails.OffenceTiming.OffenceEnd.OffenceEndDate);
  } else {
    endDate = "            ";
  }
  return { startDate, endDate };
};

const getTrailingCharacter = (num) => {
  switch (num) {
    case 1:
      return "A";
    case 2:
      return "B";
    case 3:
      return "C";
    case 4:
      return "D";
    case 5:
      return "E";
    case 6:
      return "F";
    case 7:
      return "G";
    case 8:
      return "H";
    case 9:
      return "J";
    case 10:
      return "K";
    case 11:
      return "L";
    case 12:
      return "M";
    case 13:
      return "N";
    case 14:
      return "P";
    case 15:
      return "Q";
    case 16:
      return "R";
    case 17:
      return "T";
    case 18:
      return "U";
    case 19:
      return "V";
    case 20:
      return "W";
    case 21:
      return "X";
    case 22:
      return "Y";
    case 0:
      return "Z";
    default:
      throw new Error(`Modulo value not expected ${num}`);
  }
};

const extractAndReplaceTags = (world, message, tag, uniqueId) => {
  if (!world) {
    return message;
  }

  const bits = message.split(`${tag}>`);
  if (bits.length < 2) {
    return message;
  }
  let newMessage = `${bits[0]}`;
  for (let i = 1; i < bits.length; i += 2) {
    const name = bits[i].substring(0, bits[i].length - 2);
    let newName = name;
    if (process.env.RUN_PARALLEL) {
      newName = uuid().toString().substr(0, 8) + uuid().toString().substr(0, 4); // if string is too long, it fudges the PNC
    }

    if (tag === "PersonFamilyName") {
      world.currentTestFamilyNames.push([name, newName, uniqueId]);
    } else if (tag === "PersonGivenName1") {
      world.currentTestGivenNames1.push([name, newName, uniqueId]);
    } else if (tag === "PersonGivenName2") {
      world.currentTestGivenNames2.push([name, newName, uniqueId]);
    } else if (tag === "ProsecutorReference") {
      const ASNnumber = parseInt(`${forcePNC[1] + systemPNC + yearPNC}00000${sequencePNC.toString()}`, 10);
      const characterCheck = getTrailingCharacter(ASNnumber % 23);
      newName = `${yearPNC + forcePNC + unitPNC + systemPNC}00000${sequencePNC.toString()}${characterCheck}`;

      world.currentProsecutorReference.push([name, newName, uniqueId]);
    } else if (tag === "PTIURN") {
      const sequenceNumber = parseInt(Math.random() * 8999999, 10) + 1000000;
      newName = forcePNC + unitPNC + sequenceNumber.toString();

      world.currentPTIURNValues.push([name, newName, uniqueId]);
    }

    if (process.env.RUN_PARALLEL) {
      newMessage = `${newMessage}${tag}>${newName}</${tag}>${bits[i + 1]}`;
    } else {
      newMessage = `${newMessage}${tag}>${name}</${tag}>${bits[i + 1]}`;
    }
  }
  return newMessage;
};

module.exports = {
  mockEnquiryFromNCM: (ncmFile, world, options = {}) => {
    let xmlData = fs.readFileSync(ncmFile, "utf8").toString();

    const getUniqueId = ncmFile.substring(ncmFile.length - 13 - 12, ncmFile.length - 13);
    // populate given names 1
    xmlData = extractAndReplaceTags(world, xmlData, "PTIURN", getUniqueId);
    // populate given names 1
    xmlData = extractAndReplaceTags(world, xmlData, "PersonGivenName1", getUniqueId);
    // populate given names 2
    xmlData = extractAndReplaceTags(world, xmlData, "PersonGivenName2", getUniqueId);
    // populate family names
    xmlData = extractAndReplaceTags(world, xmlData, "PersonFamilyName", getUniqueId);
    // populate prosecutor reference
    xmlData = extractAndReplaceTags(world, xmlData, "ProsecutorReference", getUniqueId);

    const parsed = parser.parse(xmlData);
    const prosecutorRef = parsed.NewCaseMessage.Case.Defendant.ProsecutorReference.slice(-7);
    const personFamilyName = parsed.NewCaseMessage.Case.Defendant.PoliceIndividualDefendant.PersonDefendant.BasePersonDetails.PersonName.PersonFamilyName.substr(
      0,
      12
    ).padEnd(12, " ");
    const offenceEl = parsed.NewCaseMessage.Case.Defendant.Offence;
    const offenceData = Object.prototype.hasOwnProperty.call(offenceEl, "length") ? offenceEl : [offenceEl];
    const offences = offenceData.map((offence) => ({
      code: offence.BaseOffenceDetails.OffenceCode.padEnd(8, " "),
      sequenceNo: offence.BaseOffenceDetails.OffenceSequenceNumber.toString().padStart(3, "0"),
      ...extractDates(offence)
    }));
    const forceStationCode = parsed.NewCaseMessage.Case.InitialHearing.CourtHearingLocation.substr(1, 4);

    const cofString = offences
      .map(
        (offence) =>
          `<COF>K${offence.sequenceNo}    12:15:24:1   ${offence.code}${offence.startDate}${offence.endDate}</COF>`
      )
      .join("\n");

    const response = `<?XML VERSION="1.0" STANDALONE="YES"?>
    <CXE01>
      <GMH>073ENQR000020SENQASIPNCA05A73000017300000120210316152773000001                                             050001772</GMH>
      <ASI>
        <FSC>K${forceStationCode}</FSC>
        <IDS>K00/${prosecutorRef} ${personFamilyName}            </IDS>
        <CCR>K97/1626/8395Q                 </CCR>
        ${cofString}
      </ASI>
      <GMT>000008073ENQR004540S</GMT>
    </CXE01>`;

    return {
      matchRegex: options.matchRegex || "CXE01",
      response,
      expectedRequest: options.expectedRequest || ""
    };
  },
  dummyUpdate: {
    matchRegex: "CXU",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?><DUMMY></DUMMY>`,
    expectedRequest: ""
  },
  mockUpdate: (code, options = {}) => {
    const response = `<?XML VERSION="1.0" STANDALONE="YES"?>
    <${code}>
      <GMH>073GENL000001RNEWREMPNCA05A73000017300000120210415154673000001                                             09000${
        parseInt(Math.random() * 8999, 10) + 1000
      }</GMH>
      <TXT>A0031-REMAND REPORT HAS BEEN PROCESSED SUCCESSFULLY - ID: 00/263503N </TXT>
      <GMT>000003073GENL000001S</GMT>
    </${code}>`;

    return {
      matchRegex: options.matchRegex || code,
      response,
      expectedRequest: options.expectedRequest || "",
      count: options.count || null
    };
  }
};
