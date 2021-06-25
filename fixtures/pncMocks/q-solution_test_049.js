module.exports = [
  {
    matchRegex: "CXE01",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?>
    <CXE01>
      <GMH>073ENQR000020SENQASIPNCA05A73000017300000120210316152773000001                                             050001772</GMH>
      <ASI>
        <FSC>K04CA</FSC>
        <IDS>K00/410800F TEARCE                  </IDS>
        <CCR>K97/1626/8395Q                 </CCR>
        <COF>K001    12:15:24:1   TH68036 281120102220            </COF>
      </ASI>
      <GMT>000008073ENQR004540S</GMT>
    </CXE01>`,
    expectedRequest: ""
  },
  {
    matchRegex: "CXU02",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?><DUMMY></DUMMY>`,
    expectedRequest:
      "<FSC>K04YZ</FSC><IDS>K00/410800F TEARCE                  </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I1892                                                                       TEARCE/WALLACE                                        260920110000</COU><CCH>K001              TH68036 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1116    26092012          00                                                                            </DIS><DIS>I3105W12                   00BA                                                                          </DIS><GMT>000010073RDIS000005S</GMT>"
  }
];
