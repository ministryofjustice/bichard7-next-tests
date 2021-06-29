const { mockEnquiryFromNCM, mockUpdate } = require("../../../utils/pncMocks");

module.exports = [
  mockEnquiryFromNCM("058"),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K05YZ</FSC><IDS>K00/37616T  HEARINGCOURT            </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I5892                                                                       HEARINGCOURT/NEXT                                     260920080000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920080000 </ADJ><DIS>I4004                      00                                                                            </DIS>"
  })
];
