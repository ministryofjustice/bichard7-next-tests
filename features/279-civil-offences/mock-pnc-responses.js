const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm, world = {}) => [
  mockEnquiryFromNCM(ncm, world),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/449617W CIVILCASE               </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2576                                                                       CIVILCASE/RECANDNONREC                                260920110000</COU><CCH>K001              TH68010 </CCH><ADJ>IGUILTY       GUILTY        260920110000 </ADJ><DIS>I1002W16                   00                                                                            </DIS>"
  })
];
