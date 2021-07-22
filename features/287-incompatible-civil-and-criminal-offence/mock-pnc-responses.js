const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/449619Y CIVILCASE               </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       CIVILCASE/RECANDNONREC                                260920110000</COU><CCH>K001              CJ08521 </CCH><ADJ>IGUILTY       GUILTY        260920110000 </ADJ><DIS>I1029                      00                                                                            </DIS>"
  })
];
