const { mockEnquiryFromNCM, mockUpdate } = require("../../../utils/pncMocks");

module.exports = [
  mockEnquiryFromNCM("174"),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410920L JERICHO                 </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       JERICHO/MARCUS                                        011020110000</COU><CCH>K001              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><CCH>K002              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS>"
  })
];
