const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks")

module.exports = (ncm, world = {}) => [
  mockEnquiryFromNCM(ncm, world),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410805L ANCHOVY                 </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2576                                                                       ANCHOVY/ADAM                                          260920110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1002M12                   00F                                                                           </DIS><DIS>I1024M12                   00F                                                                           </DIS><DIS>I1081M12                   00F                                                                           </DIS><CCH>K002              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1100M6                    00            EXCLUDED FROM ALL LICENSED PREMISES WITHIN DIDLY DISTRICT COUNC+</DIS><DIS>I3025Y999                  00            SEA MONKEY                                                      </DIS><CCH>K003              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I3041M12                   00            EXCLUDED FROM SEAWORLD PUBLIC HOUSE, SEAWORLD, PICKERING, NORTH+</DIS><CCH>K004              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1116    21052013          00                                                                            </DIS><CCH>K005              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1116    26092011          00                                                                            </DIS><CCH>K006              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1116    26092011          00                                                                            </DIS><CCH>K007              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1116                      00                                                                            </DIS>"
  })
]
