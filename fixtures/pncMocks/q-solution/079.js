const { mockEnquiryFromNCM, mockUpdate } = require("../../../utils/pncMocks");

module.exports = [
  mockEnquiryFromNCM("079"),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410834T BEN                     </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       BEN/MISTER                                            260920110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1115W2                    00S       W12                                                                 </DIS><DIS>I3105W12                   00BA                                                                          </DIS>"
  })
];
