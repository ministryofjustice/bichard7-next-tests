const { mockUpdate } = require("../../utils/pncMocks");

module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000308RENQASIPNCA05A73000017300000120210901125273000001                                             050002295</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/8C      FOARDS                  </IDS>
        <CCR>K21/2732/8Q                    </CCR>
        <COF>K001    1:8:11:2     CJ88116 28112010                </COF>
      </ASI>
      <GMT>000008073ENQR000308R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/8C      FOARDS                  </IDS><CCR>K21/2732/8Q                    </CCR><COU>I2576                                                                       FOARDS/LORNE                                          260920110000</COU><CCH>K001              CJ88116 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1018M12                   00                                                                            </DIS>",
    count: 1
  }),
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000309RENQASIPNCA05A73000017300000120210901125273000001                                             050002297</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/7B      FOARDS                  </IDS>
        <CCR>K21/2732/7P                    </CCR>
        <COF>K001    8:7:45:2     PC00525 01072010    02072010    </COF>
      </ASI>
      <GMT>000008073ENQR000309R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/7B      FOARDS                  </IDS><CCR>K21/2732/7P                    </CCR><COU>I2576                                                                       FOARDS/LORNE                                          010820110000</COU><CCH>K001              PC00525 </CCH><ADJ>INOT GUILTY   GUILTY        010820110000 </ADJ><DIS>I1040                      00                                                                            </DIS><DIS>I1087                      00                                                                            </DIS>",
    count: 1
  })
];
