const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410830N DETAILSTRIG             </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2576                                                                       DETAILSTRIG/PERSONAL                                  260920110000</COU><CCH>K001              CJ88144 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1015            0000100.0000                                                                            </DIS>"
  })
];
