const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  { ...mockEnquiryFromNCM(ncm.replace(".xml", "-1.xml")), count: 1 },
  { ...mockEnquiryFromNCM(ncm.replace(".xml", "-2.xml")), count: 1 },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/445720M TOSINGLECCR             </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       TOSINGLECCR/MULTIPLECCR                               011120110000</COU><CCH>K001              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        011120110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><DIS>I3025Y999                  00            SEA MONKEY                                                      </DIS><CCH>K002              CJ88001 </CCH><ADJ>INOT GUILTY   GUILTY        011120110000 </ADJ><DIS>I1002M14                   00                                                                            </DIS><DIS>I3107                      00                                                                            </DIS>"
  })
];
