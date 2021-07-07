const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/445739G ADJSINEDIE              </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       ADJSINEDIE/NOCONVICTIONDATE                           250920110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   NON-CONVICTION250920110000 </ADJ><DIS>I2007                      00                                                                            </DIS><CCH>K002              TH68151 </CCH><ADJ>INOT GUILTY   NON-CONVICTION250920110000 </ADJ><DIS>I2007                      00                                                                            </DIS><CCH>K003              RT88191 </CCH><ADJ>INOT GUILTY   NON-CONVICTION250920110000 </ADJ><DIS>I2007                      00                                                                            </DIS>"
  })
];
