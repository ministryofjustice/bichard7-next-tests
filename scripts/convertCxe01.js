const { XMLParser } = require("fast-xml-parser");
const fs = require("fs");

const parser = new XMLParser({ ignoreAttributes: false });

const filePath = process.argv[process.argv.length - 1];
console.log(filePath);
const xmlData = fs.readFileSync(filePath);
const parsed = parser.parse(xmlData);

const forceStationCode = parsed.CXE01.FSC["@_FSCode"];
const prosecutorRef = "000000X";
const personFamilyName = parsed.CXE01.IDS["@_Checkname"].padEnd(12, " ");
console.log(JSON.stringify(parsed, null, 2));

const toArray = (input) => (Array.isArray(input) ? input : [input]);

const courtCases = toArray(parsed.CXE01.CourtCases.CourtCase);

const cofString = courtCases
  .map((courtCase) =>
    [`<CCR>K${courtCase.CCR["@_CourtCaseRefNo"]}                    </CCR>`].concat(
      toArray(courtCase.Offences.Offence).map(
        (offence) =>
          `    <COF>K${offence.COF["@_ReferenceNumber"]}    ${offence.COF["@_ACPOOffenceCode"].padEnd(11, " ")}  ${
            offence.COF["@_CJSOffenceCode"]
          } ${offence.COF["@_OffStartDate"]}${offence.COF["@_OffStartTime"].padEnd(4, " ")}${offence.COF[
            "@_OffEndDate"
          ].padEnd(8, " ")}${offence.COF["@_OffEndTime"].padEnd(4, " ")}</COF>`
      )
    )
  )
  .flat()
  .join("\n");

console.log(`<?XML VERSION="1.0" STANDALONE="YES"?>
<CXE01>
  <GMH>073ENQR000020SENQASIPNCA05A73000017300000120210316152773000001                                             050001772</GMH>
  <ASI>
    <FSC>K${forceStationCode}</FSC>
    <IDS>K00/${prosecutorRef} ${personFamilyName}            </IDS>
    <CCR>K97/1626/8395Q                 </CCR>
    ${cofString}
  </ASI>
  <GMT>000008073ENQR004540S</GMT>
</CXE01>`);
