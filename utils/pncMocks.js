const fs = require("fs");
const parser = require("fast-xml-parser");

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

module.exports = {
  mockEnquiryFromNCM: (ncmFile, options = {}) => {
    const xmlData = fs.readFileSync(ncmFile, "utf8");
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
      <GMH>073GENL000001RNEWREMPNCA05A73000017300000120210415154673000001                                             090001753</GMH>
      <TXT>A0031-REMAND REPORT HAS BEEN PROCESSED SUCCESSFULLY - ID: 00/263503N </TXT>
      <GMT>000003073GENL000001S</GMT>
    </${code}>`;

    return {
      matchRegex: options.matchRegex || code,
      response,
      expectedRequest: options.expectedRequest || ""
    };
  }
};
