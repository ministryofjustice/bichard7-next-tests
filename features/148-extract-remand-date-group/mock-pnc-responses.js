const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410865B REMANDTEST              </IDS><ASR>K11/01ZD/01/410865B                    </ASR><REM>I25042011B    2576                                                                       081220110453                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>"
  }),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410865B REMANDTEST              </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2576                                                                       REMANDTEST/CORTEZ                                     250420110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        250420110000 </ADJ><DIS>I4014    08122011          00                                                                            </DIS>"
  })
];
