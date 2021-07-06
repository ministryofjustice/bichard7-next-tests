const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  mockEnquiryFromNCM(ncm),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410826J INNOCUOUS               </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       INNOCUOUS/MISTER                                      260920110000</COU><RCC>I0100/5100008                                                                       </RCC><CCH>K001              TH68006 </CCH><ADJ>I                                   0000 </ADJ><DIS>I2060                      00                                                                            </DIS><ASR>K11/01ZD/01/410826J                    </ASR><ACH>I                                                                                                                                            TH68072                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     NKINGSTON HIGH STREET                                                                                                                                                                                                                   010028112010                </ACH><ADJ>IGUILTY       GUILTY        260920110000 </ADJ><DIS>I1015            0000200.0000                                                                            </DIS>"
  })
];