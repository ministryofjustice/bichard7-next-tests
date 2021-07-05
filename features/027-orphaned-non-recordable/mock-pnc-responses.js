const { mockUpdate, mockEnquiryFromNCM } = require("../../utils/pncMocks");

module.exports = [
  mockEnquiryFromNCM("027"),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/459646G TRPRTWELVE              </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I1892                                                                       WELLS/HOMER                                           260920110000</COU><CRT>I2732                                                                       08102011</CRT><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   NOT GUILTY    260920110000 </ADJ><DIS>I2051                      00                                                                            </DIS><CCH>K002              RT88191 </CCH><ADJ>INOT GUILTY                         0000 </ADJ><DIS>I2059                      00                                                                            </DIS>"
  }),
  mockEnquiryFromNCM("027"),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/459646G TRPRTWELVE              </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I1892                                                                       WELLS/HOMER                                           081020110000</COU><CCH>K002              RT88191 </CCH><ADJ>INOT GUILTY   GUILTY        081020110000 </ADJ><DIS>I1015            0000100.0000                                                                            </DIS>"
  })
];
