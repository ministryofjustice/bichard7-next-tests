module.exports = [
  {
    matchRegex: "CXE01",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?>
    <CXE01>
      <GMH>073ENQR000020SENQASIPNCA05A73000017300000120210316152773000001                                             050001772</GMH>
      <ASI>
        <FSC>K04CA</FSC>
        <IDS>K00/410770Y TRPRTWELVE              </IDS>
        <CCR>K97/1626/8395Q                 </CCR>
        <COF>K001    12:15:24:1   TH68006 281120102220            </COF>
        <COF>K002    12:15:24:1   RT88191 281120102220            </COF>
      </ASI>
      <GMT>000008073ENQR004540S</GMT>
    </CXE01>`,
    expectedRequest: ""
  },
  {
    matchRegex: "CXU02",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?>
    <CXU02>
      <GMH>073GENL000001RNEWREMPNCA05A73000017300000120210415154673000001                                             090001753</GMH>
      <TXT>A0031-REMAND REPORT HAS BEEN PROCESSED SUCCESSFULLY - ID: 00/263503N </TXT>
      <GMT>000003073GENL000001S</GMT>
    </CXU02>`,
    expectedRequest:
      "<FSC>K04YZ</FSC><IDS>K00/410770Y TRPRTWELVE              </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I1892                                                                       TRTHREE/TRPSTWO                                       260920110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I1015            0000100.0000                                                                            </DIS><CCH>K002              RT88191 </CCH><ADJ>INOT GUILTY   GUILTY        260920110000 </ADJ><DIS>I3107                      00                                                                            </DIS>"
  }
];
