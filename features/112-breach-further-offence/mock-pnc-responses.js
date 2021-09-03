const { mockUpdate } = require("../../utils/pncMocks");

module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000697RENQASIPNCA05A73000017300000120210903102173000001                                             050002883</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/28Z     SUSSENTENCE             </IDS>
        <CCR>K21/2732/22F                   </CCR>
        <COF>K001    1:8:11:2     CJ88116 28112010                </COF>
      </ASI>
      <GMT>000008073ENQR000697R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/28Z     SUSSENTENCE             </IDS><CCR>K21/2732/22F                   </CCR><COU>I2732                                                                       SUSSENTENCE/BREACH                                    260920110000</COU><CCH>K001              CJ88116 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1115M4                    00S       M12                                                                 </DIS>",
    count: 1
  }),
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000698RENQASIPNCA05A73000017300000120210903102173000001                                             050002885</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/29A     SUSSENTENCE             </IDS>
        <CCR>K21/2732/23G                   </CCR>
        <COF>K001    5:5:8:1      TH68010 01102010                </COF>
      </ASI>
      <GMT>000008073ENQR000698R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/29A     SUSSENTENCE             </IDS><CCR>K21/2732/23G                   </CCR><COU>I2732                                                                       SUSSENTENCE/BREACH                                    261020110000</COU><CCH>K001              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        261020110000 </ADJ><DIS>I1002M3                    00                                                                            </DIS>",
    count: 1
  })
];
