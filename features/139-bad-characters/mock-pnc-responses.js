const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410862Y TWOHUNDRED              </IDS><ASR>K11/01ZD/01/410862Y                    </ASR><REM>I26092011B    2576                                                                       261020111910                                                                       BAIL CONDITIONS TEXT EQUAL TO TWO HUNDRED         CHARACTERS UP TO END. THIS TEXT ALSO CONTAINS AN  INVALID CHARACTER WHICH SHOULD BE CONVERTED INTO AQUESTION MARK. HERE IS THE INVALID CHARACTER NOW ?THE END                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                0000                                                                                                                                                                              </REM>"
  })
];
