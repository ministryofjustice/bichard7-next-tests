const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K93YZ</FSC><IDS>K00/377221G WORTH                   </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2987                                                                       WORTH/DAVID                                           260920080000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920080000 </ADJ><DIS>I1016                      00                                                                            </DIS><CCH>K002              TH68151 </CCH><ADJ>INOT GUILTY   GUILTY        260920080000 </ADJ><DIS>I1015            0000100.0000                                                                            </DIS><CCH>K003              RT88191 </CCH><ADJ>INOT GUILTY   GUILTY        260920080000 </ADJ><DIS>I1015            0000200.0000                                                                            </DIS><ASR>K11/01VK/01/377221G                    </ASR><ACH>I                                                                                                                                            TH68006                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     NKINGSTON HIGH STREET                                                                                                                                                                                                                   930029112006                </ACH><ADJ>INOT GUILTY   NOT GUILTY    260920080000 </ADJ><DIS>I2004                      00                                                                            </DIS><ACH>I                                                                                                                                            RT88026                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     NKINGSTON HIGH STREET                                                                                                                                                                                                                   930028112006                </ACH><ADJ>INOT GUILTY   GUILTY        260920080000 </ADJ><DIS>I1015            0000300.0000                                                                            </DIS>"
  })
];
