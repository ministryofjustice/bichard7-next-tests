const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/440805V RESTRAINORDE            </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       RESTRAINORDER/UNDATED                                 260920110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I3047                      00            UNTIL FURTHER ORDER                                             </DIS>"
  })
];
