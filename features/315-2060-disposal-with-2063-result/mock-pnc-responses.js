const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/500002P TWOZEROSIXTH            </IDS><ASR>K11/01ZD/01/500002P                    </ASR><REM>I26092011B    2732                                                                       010220122732                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>"
  }),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/500002P TWOZEROSIXTH            </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       TWOZEROSIXTHREE/NOPNCUPDATE                           260920110000</COU><RCC>I01ZD/0300508                                                                       </RCC><CCH>K001              TH68006 </CCH><ADJ>I                                   0000 </ADJ><DIS>I2060                      00                                                                            </DIS><ASR>K11/01ZD/01/500002P                    </ASR><ACH>I                                                                                                                                            TH68151                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     NKINGSTON HIGH STREET                                                                                                                                                                                                                   01ZD28112010                </ACH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I4004    01022012          00                                                                            </DIS>"
  })
];
