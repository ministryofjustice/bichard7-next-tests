const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410804K LADYFISH                </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       LADYFISH/LARRY                                        260920110000</COU><CCH>K001              TH68151 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I3102                      00            10 SESSIONS                                                     </DIS><CCH>K002              RT88191 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I3110                      00            5 SESSIONS                                                      </DIS>"
  })
];
