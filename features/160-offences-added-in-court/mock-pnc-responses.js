const { mockUpdate } = require("../../utils/pncMocks");

module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000704RENQASIPNCA05A73000017300000120210903102273000001                                             050002898</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/12G     BUELLER                 </IDS>
        <CCR>K21/2732/8Q                    </CCR>
        <COF>K001    5:5:8:1      TH68010 25092010                </COF>
        <COF>K002    5:7:11:10    TH68151 25092010                </COF>
      </ASI>
      <GMT>000009073ENQR000704R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/12G     BUELLER                 </IDS><CCR>K21/2732/8Q                    </CCR><COU>I2576                                                                       BUELLER/PAUL                                          011020110000</COU><CRT>I2576                                                                       01022012</CRT><CCH>K001              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><CCH>K002              TH68151 </CCH><ADJ>INOT GUILTY                         0000 </ADJ><DIS>I2059                      00                                                                            </DIS>",
    count: 1
  }),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/12G     BUELLER                 </IDS><ASR>K11/01ZD/01/411380L                    </ASR><REM>I01102011B    2576                                                                       010220122576                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>",
    count: 1
  }),
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000705RENQASIPNCA05A73000017300000120210903102273000001                                             050002901</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/12G     BUELLER                 </IDS>
        <CCR>K21/2732/8Q                    </CCR>
        <COF>K001    5:5:8:1      TH68010 25092010                </COF>
        <ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ>
        <DIS>I1002M12                                                                                                 </DIS>
        <CCR>K21/2732/25J                   </CCR>
        <COF>K001    5:7:11:10    TH68151 25092010                </COF>
      </ASI>
      <GMT>000012073ENQR000705R</GMT>
    </CXE01>
    `,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/12G     BUELLER                 </IDS><CCR>K21/2732/25J                   </CCR><COU>I2576                                                                       BUELLER/PAUL                                          010220120000</COU><CRT>I2576                                                                       02032012</CRT><CCH>K001              TH68151 </CCH><ADJ>INOT GUILTY                         0000 </ADJ><DIS>I2059                      00                                                                            </DIS><ASR>K11/01ZD/01/411380L                    </ASR><ACH>I                                                                                                                                            TH68006                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     N1 KINGSTON HIGH STREET                                                                                                                                                                                                                 01ZD26092010                </ACH><ADJ>INOT GUILTY   GUILTY        010220120000 </ADJ><DIS>I1002M13                   00                                                                            </DIS>",
    count: 1
  }),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/12G     BUELLER                 </IDS><ASR>K11/01ZD/01/411380L                    </ASR><REM>I01022012B    2576                                                                       020320122576                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>",
    count: 1
  })
];
