const { mockUpdate } = require("../../../utils/pncMocks");

module.exports = [
  {
    matchRegex: "CXE01",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?>
    <CXE01>
      <GMH>073ENQR000020SENQASIPNCA05A73000017300000120210316152773000001                                             050001772</GMH>
      <ASI>
        <FSC>K04CA</FSC>
        <IDS>K00/459646G WILLIAMS                </IDS>
        <CCR>K97/1626/8395Q                 </CCR>
        <COF>K001    12:15:24:1   CJ67002 010620092220            </COF>
      </ASI>
      <GMT>000008073ENQR004540S</GMT>
    </CXE01>`,
    expectedRequest: ""
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K04YZ</FSC><IDS>K00/459646G WILLIAMS                </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       WILLIAMS/PETER                                        261120090000</COU><CCH>K001              CJ67002 </CCH><ADJ>INOT GUILTY   GUILTY        261120090000 </ADJ><DIS>I1015            0000100.0000                                                                            </DIS>"
  })
];
