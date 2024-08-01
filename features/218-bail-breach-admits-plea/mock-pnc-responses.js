const { mockUpdate } = require("../../utils/pncMocks")

module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000712RENQASIPNCA05A73000017300000120210903102473000001                                             050002916</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/17M     BAILY                   </IDS>
        <CCR>K21/2732/11U                   </CCR>
        <COF>K001    1:8:11:2     CJ88116 28112010                </COF>
      </ASI>
      <GMT>000008073ENQR000712R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/17M     BAILY                   </IDS><ASR>K12/01ZD/01/445098K                    </ASR><REM>I26092011B    2576                                                                       261020112576                                                                       EXCLUSION: NOT TO CONTACT DIRECTLY OR INDIRECTLY  SOME ONE SAVE VIA A SOLICITOR TO ARRANGE CONTACT  WITH CHILD                                                                                          EXCLUSION: NOT TO ENTER SOME ROAD OR SOME LANE IN SOME PLACE UNTIL HE HAS ATTENDED IN THE COMPANY OFA POLICE OFICER TO CONFIRM SOME ONE HAS LEFT THE  AREA                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             0000                                                                                                                                                                              </REM>",
    count: 1
  }),
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000713RENQASIPNCA05A73000017300000120210903102473000001                                             050002918</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/17M     BAILY                   </IDS>
        <CCR>K21/2732/11U                   </CCR>
        <COF>K001    1:8:11:2     CJ88116 28112010                </COF>
      </ASI><GMT>000008073ENQR000713R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K21/17M     BAILY                   </IDS><ASR>K12/01ZD/01/445098K                    </ASR><REM>I26102011B    2576                                                                       261120112576                                                                       EXCLUSION: NOT TO CONTACT DIRECTLY OR INDIRECTLY  SOME ONE SAVE VIA A SOLICITOR TO ARRANGE CONTACT  WITH CHILD                                                                                          EXCLUSION: NOT TO ENTER SOME ROAD OR SOME LANE IN SOME PLACE UNTIL HE HAS ATTENDED IN THE COMPANY OFA POLICE OFICER TO CONFIRM SOME ONE HAS LEFT THE  AREA                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             0000                                                                                                                                                                              </REM>",
    count: 1
  })
]
