const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks")

module.exports = (ncm, world = {}) => [
  mockEnquiryFromNCM(ncm, world),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/415369X DEEELAR                 </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2576                                                                       DEEELAR/THETUBE                                       260920110000</COU><CCH>K001              TH68006 </CCH><ADJ>INO PLEA TAKENNON-CONVICTION260920110000 </ADJ><DIS>I1008                      00                                                                            </DIS>"
  })
]
