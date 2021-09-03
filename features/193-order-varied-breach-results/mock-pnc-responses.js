const { mockUpdate } = require("../../utils/pncMocks");

module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000326RENQASIPNCA05A73000017300000120210901131473000001                                             050002331</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/17M     ORDERTOCONTI            </IDS>
        <CCR>K21/2732/13W                   </CCR>
        <COF>K001    1:8:11:2     CJ88116 28112010                </COF>
      </ASI>
      <GMT>000008073ENQR000326R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/17M     ORDERTOCONTI            </IDS><CCR>K21/2732/13W                   </CCR><COU>I2732                                                                       ORDERTOCONTINUE/STANDALONE                            260920110000</COU><CCH>K001              CJ88116 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1116    26092012          00                                                                            </DIS><DIS>I3101H100                  00                                                                            </DIS>",
    count: 1
  }),
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000327RENQASIPNCA05A73000017300000120210901131473000001                                             050002333</GMH>
      <ASI>
        <FSC>K01VK</FSC>
        <IDS>K21/18N     ORDERTOCONTI            </IDS>
        <CCR>K21/2812/4H                    </CCR>
        <COF>K001    8:7:69:3     CJ03510 01102009                </COF>
      </ASI>
      <GMT>000008073ENQR000327R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/18N     ORDERTOCONTI            </IDS><CCR>K21/2812/4H                    </CCR><COU>I2732                                                                       ORDERTOCONTINUE/STANDALONE                            261020090000</COU><CCH>K001              CJ03510 </CCH><ADJ>IGUILTY       GUILTY        261020090000 </ADJ><DIS>I1030                      00                                                                            </DIS>",
    count: 1
  })
];
