const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm, world = {}) => [
  mockEnquiryFromNCM(ncm, world),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/448755K SUSPENDED               </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2576                                                                       SUSPENDED/DRIVERDISQ                                  260920110000</COU><CCH>K001              RT88191 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1015            0000200.0000                                                                            </DIS><DIS>I3072M6                    00                                                                            </DIS><DIS>I3075                      00                                                                            </DIS>"
  })
];
