const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410865B REMANDTEST              </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       REMANDTEST/CORTEZ                                     250420110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        250420110000 </ADJ><DIS>I4014    08122011          00                                                                            </DIS>"
  })
];
