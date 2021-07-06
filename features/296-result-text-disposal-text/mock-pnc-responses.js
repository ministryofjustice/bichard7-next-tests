const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/449847V RESULTTEXTIS            </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       RESULTTEXTISUSED/DUPLICATEOFFENCES                    260920110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1100W6                    00BA          EXCLUDED FROM ALL LICENSED PREMISES WITHIN DIDLY DISTRICT COUNC+</DIS><DIS>I3041M12                   00            EXCLUDED FROM SEAWORLD PUBLIC HOUSE, SEAWORLD, PICKERING, NORTH+</DIS><CCH>K002              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1100W6                    00BA          EXCLUDED FROM ALL LICENSED PREMISES WITHIN IDLY DISTRICT COUNCI+</DIS><DIS>I3041M12                   00            EXCLUDED FROM LANDWORLD PUBLIC HOUSE, LANDWORLD, PICKERING, NOR+</DIS>"
  })
];