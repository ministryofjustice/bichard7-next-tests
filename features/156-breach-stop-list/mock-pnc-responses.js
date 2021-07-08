const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410812U DUCK                    </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       DUCK/JAMES                                            261020110000</COU><CCH>K001              DD89003 </CCH><ADJ>IGUILTY       GUILTY        261020110000 </ADJ><DIS>I1002W2                    00                                                                            </DIS>"
  })
];
