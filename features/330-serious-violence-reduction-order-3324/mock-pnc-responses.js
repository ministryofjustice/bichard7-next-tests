const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm, world = {}) => [
  mockEnquiryFromNCM(ncm, world),
  {
    matchRegex: "CXU02",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?>
      <CXU02>
        <GMH>073GENL000001RNEWREMPNCA05A73000017300000120210415154673000001                                             09000${
          parseInt(Math.random() * 8999, 10) + 1000
        }</GMH>
        <TXT>I0001 - THE FOLLOWING ELEMENT(S) IN THE DIS SEGMENT CONTAIN INVALID DATA: DISPOSAL TYPE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     </TXT>
        <GMT>000003073GENL000001S</GMT>
      </CXU02>`,
    expectedRequest: "",
    count: 0
  }
];
