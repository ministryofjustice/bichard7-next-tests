const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410756H FINCH                   </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       FINCH/MARK                                            261020110000</COU><CCH>K001              CJ03510 </CCH><ADJ>INO PLEA TAKENNOT GUILTY    261020110000 </ADJ><DIS>I2004                      00                                                                            </DIS>"
  })
];
