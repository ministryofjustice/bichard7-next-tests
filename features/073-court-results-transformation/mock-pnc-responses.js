const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks")

module.exports = (ncm, world = {}) => [
  mockEnquiryFromNCM(ncm, world),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410828L NOCONVICTION            </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2576                                                                       NOCONVICTION/MISTER                                   260920110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   NOT GUILTY    260920110000 </ADJ><DIS>I2050                      00                                                                            </DIS><CCH>K002              TH68151 </CCH><ADJ>INOT GUILTY   NOT GUILTY    260920110000 </ADJ><DIS>I2050                      00                                                                            </DIS><CCH>K003              RT88191 </CCH><ADJ>INOT GUILTY   NON-CONVICTION260920110000 </ADJ><DIS>I2063                      00                                                                            </DIS>"
  })
]
