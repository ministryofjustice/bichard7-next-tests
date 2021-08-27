const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410791W SCREWDRIVER             </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       SCREWDRIVER/PHILIP                                    250920110000</COU><CCH>K001              RT88191 </CCH><ADJ>INOT GUILTY   GUILTY        250920110000 </ADJ><DIS>I1015            0000045.0000                                                                            </DIS>"
  })
];
