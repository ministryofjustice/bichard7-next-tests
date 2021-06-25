module.exports = [
  {
    matchRegex: "CXE01",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?>
    <CXE01>
      <GMH>073ENQR000020SENQASIPNCA05A73000017300000120210625131973000001                                             050001782</GMH>
      <ASI>
        <FSC>K04CA</FSC>
        <IDS>K00/410789U BETHEL                  </IDS>
        <CCR>K97/1626/8395Q                 </CCR>
        <COF>K001    12:15:24:1   TH68006 281120102220            </COF>
        <COF>K002    12:15:24:1   TH68151 281120102220            </COF>
        <COF>K003    12:15:24:1   RT88191 281120102220            </COF>
      </ASI>
      <GMT>000003073ENQR000001S</GMT>
    </CXE01>`,
    expectedRequest: ""
  },
  {
    matchRegex: "CXU02",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?>
    <CXU01>
      <GMH>073ENQR000020SENQASIPNCA05A73000017300000120210625131973000001                                             090001753</GMH>
      <TXT>A0031-REMAND REPORT HAS BEEN PROCESSED SUCCESSFULLY - ID: 00/263503N </TXT>
      <GMT>000015073RDIS000002S</GMT>
    </CXU01>`,
    expectedRequest:
      "<FSC>K04YZ</FSC><IDS>K00/410789U BETHEL                  </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I1892                                                                       BETHEL/BARRY                                          250120110000</COU><CCH>K001              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        250120110005 </ADJ><DIS>I1015            0000100.0000                                                                            </DIS><CCH>K002              TH68151 </CCH><ADJ>INOT GUILTY   GUILTY        250120110015 </ADJ><DIS>I1002M12                   00                                                                            </DIS><CCH>K003              RT88191 </CCH><ADJ>INOT GUILTY   GUILTY        250120110000 </ADJ><DIS>I1015            0000100.0000                                                                            </DIS>"
  }
];
