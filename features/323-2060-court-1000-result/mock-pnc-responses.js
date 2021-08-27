const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/500017F TWOZEROSIXZE            </IDS><ASR>K11/01ZD/01/500017F                    </ASR><REM>I26092011B    2732                                                                       081020112732                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>"
  }),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/500017F TWOZEROSIXZE            </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       TWOZEROSIXZERO/RECRESULT                              260920110000</COU><CRT>I2732                                                                       08102011</CRT><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   NON-CONVICTION260920110000 </ADJ><DIS>I2063                      00                                                                            </DIS><ASR>K11/01ZD/01/500017F                    </ASR><ACH>I                                                                                                                                            TH68151                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     NKINGSTON HIGH STREET                                                                                                                                                                                                                   010028112010                </ACH><ADJ>INOT GUILTY                         0000 </ADJ><DIS>I2059                      00                                                                            </DIS>"
  })
];