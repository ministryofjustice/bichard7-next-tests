const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/445101N UNDATED                 </IDS><ASR>K12/01ZD/01/445101N                    </ASR><REM>I26092011A    2576                                                                               9998*****1ST INSTANCE WARRANT ISSUED*****                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0000                                                                                                                                                                              </REM>"
  })
];
