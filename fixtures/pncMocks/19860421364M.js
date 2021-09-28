module.exports = [
  {
    matchRegex: "CXE01",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?>
    <CXE01>
      <GMH>073ENQR000001RENQASIPNCA05A73000017300000120210415154673000001                                             050001753</GMH>
      <ASI>
        <FSC>K05AM</FSC>
        <IDS>K00/263503N SCENARIOAD/M            </IDS>
        <CCR>K08/2812/7K                    </CCR>
        <COF>K001    5:5:5:1      TH68010 03011996                </COF>
        <ADJ>INOT GUILTY   GUILTY        260920070000 </ADJ>
        <DIS>I1015            100.00                                                                                  </DIS>
      </ASI>
      <GMT>000010073ENQR000001S</GMT>
    </CXE01>`,
    expectedRequest: "<E07>96/05AM/00/263503N         </E07>"
  },
  {
    matchRegex: "CXU01",
    response: `<?XML VERSION="1.0" STANDALONE="YES"?>
    <CXU01>
      <GMH>073GENL000001RNEWREMPNCA05A73000017300000120210415154673000001                                             090001753</GMH>
      <TXT>A0031-REMAND REPORT HAS BEEN PROCESSED SUCCESSFULLY - ID: 00/263503N </TXT>
      <GMT>000003073GENL000001S</GMT>
    </CXU01>`,
    expectedRequest:
      "<FSC>K05YZ</FSC><IDS>K00/263503N SCENARIOAD              </IDS><ASR>K96/05AM/00/263503N                    </ASR><REM>I07052017B    1972                                                                       130920121972                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>"
  }
];
