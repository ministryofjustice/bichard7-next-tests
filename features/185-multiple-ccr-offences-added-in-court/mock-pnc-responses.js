const { mockUpdate } = require("../../utils/pncMocks");

module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000140RENQASIPNCA05A73000017300000120210831093073000001                                             050001967</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K12/24H     HARMON                  </IDS>
        <CCR>K12/2732/41V                   </CCR>
        <COF>K001                 RR84042 01062009                </COF>
        <COF>K002    1:9:7:1      OF61016 01062009                </COF>
        <CCR>K12/2732/42W                   </CCR>
        <COF>K001    5:5:2:1      TH68001 01062009                </COF>
      </ASI>
      <GMT>000011073ENQR000140R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K12/24H     HARMON                  </IDS><CCR>K12/2732/41V                   </CCR><COU>I2576                                                                       HARMON/MARTIN                                         091020090000</COU><CCH>K001              RR84042 </CCH><ADJ>INOT GUILTY   NOT GUILTY    091020090000 </ADJ><DIS>I2004                      00                                                                            </DIS><CCH>K002              OF61016 </CCH><ADJ>INOT GUILTY   NOT GUILTY    091020090000 </ADJ><DIS>I2004                      00                                                                            </DIS>",
    count: 1
  }),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K12/24H     HARMON                  </IDS><ASR>K12/0000/00/16D                        </ASR><REM>I09102009B    2576                                                                       191020092576                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>",
    count: 1
  }),
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000141RENQASIPNCA05A73000017300000120210831093073000001                                             050001970</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K12/24H     HARMON                  </IDS>
        <CCR>K12/2732/41V                   </CCR>
        <COF>K001                 RR84042 01062009                </COF>
        <ADJ>INOT GUILTY   NOT GUILTY    091020090000 </ADJ>
        <DIS>I2004                                                                                                    </DIS>
        <COF>K002    1:9:7:1      OF61016 01062009                </COF>
        <ADJ>INOT GUILTY   NOT GUILTY    091020090000 </ADJ>
        <DIS>I2004                                                                                                    </DIS>
        <CCR>K12/2732/42W                   </CCR>
        <COF>K001    5:5:2:1      TH68001 01062009                </COF>
      </ASI>
      <GMT>000015073ENQR000141R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K12/24H     HARMON                  </IDS><CCR>K12/2732/42W                   </CCR><COU>I2576                                                                       HARMON/MARTIN                                         191020090000</COU><CCH>K001              TH68001 </CCH><ADJ>INOT GUILTY   GUILTY        191020090000 </ADJ><DIS>I4004    21102009          00                                                                            </DIS><ASR>K12/0000/00/16D                        </ASR><ACH>I                                                                                                                                            TH68151                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     NKINGSTON HIGH STREET                                                                                                                                                                                                                   01ZD02112006                </ACH><ADJ>INOT GUILTY   GUILTY        191020090000 </ADJ><DIS>I1002M14                   00                                                                            </DIS>",
    count: 1
  }),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K12/24H     HARMON                  </IDS><ASR>K12/0000/00/16D                        </ASR><REM>I19102009B    2576                                                                       211020092576                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>",
    count: 1
  })
];
