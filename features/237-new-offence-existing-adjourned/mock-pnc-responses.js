const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/445742K OFFENCEADDED            </IDS><ASR>K12/01ZD/01/445742K                    </ASR><REM>I26092011B    2732                                                                       261020112732                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>"
  }),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/445742K OFFENCEADDED            </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       OFFENCEADDED/APJJWF                                   260920110000</COU><CRT>I2732                                                                       26102011</CRT><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY                         0000 </ADJ><DIS>I2059                      00                                                                            </DIS><CCH>K002              TH68151 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1015            0000400.0000                                                                            </DIS><ASR>K12/01ZD/01/445742K                    </ASR><ACH>I                                                                                                                                            TH68010                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     NKINGSTON HIGH STREET                                                                                                                                                                                                                   010029112010                </ACH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1015            0000300.0000                                                                            </DIS>"
  })
];