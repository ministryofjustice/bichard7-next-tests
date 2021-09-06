const { mockUpdate } = require("../../utils/pncMocks");

module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000726RENQASIPNCA05A73000017300000120210903102673000001                                             050002947</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/27Y     SUBSEQUENTRE            </IDS>
        <CCR>K21/2732/21E                   </CCR>
        <COF>K001    5:5:5:1      TH68006 28112010                </COF>
        <COF>K002    5:7:11:10    TH68151 28112010                </COF>
      </ASI>
      <GMT>000009073ENQR000726R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/27Y     SUBSEQUENTRE            </IDS><ASR>K14/01ZD/01/449843Q                    </ASR><REM>I26092011B    2732                                                                       261020112732                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>",
    count: 1
  }),
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000727RENQASIPNCA05A73000017300000120210903102673000001                                             050002949</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/27Y     SUBSEQUENTRE            </IDS>
        <CCR>K21/2732/21E                   </CCR>
        <COF>K001    5:5:5:1      TH68006 28112010                </COF>
        <COF>K002    5:7:11:10    TH68151 28112010                </COF>
      </ASI><GMT>000009073ENQR000727R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/27Y     SUBSEQUENTRE            </IDS><ASR>K14/01ZD/01/449843Q                    </ASR><REM>I26102011B    2732                                                                       261120112732                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>",
    count: 1
  })
];
