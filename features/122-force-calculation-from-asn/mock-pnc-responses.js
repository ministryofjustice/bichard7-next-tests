module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
    <GMH>073ENQR010179EERRASIPNCA05A73000017300000120231120164473000001                                             050018295</GMH>
    <TXT>I1008 - GWAY - ENQUIRY ERROR INVALID ARREST/SUMMONS REF 11/01HZ/01/376274C                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </TXT>
    <GMT>000003073ENQR010179E</GMT></CXE01>`,
    expectedRequest: ""
  }
];
