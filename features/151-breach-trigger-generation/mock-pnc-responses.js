const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks")

module.exports = (ncm, world = {}) => [
  mockEnquiryFromNCM(ncm, world),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410762P SEAGULL                 </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2576                                                                       SEAGULL/MARTIN                                        261020110000</COU><CCH>K001              TH68001 </CCH><ADJ>IGUILTY       GUILTY        261020110000 </ADJ><DIS>I1029                      00                                                                            </DIS>"
  })
]
