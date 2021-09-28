const { mockUpdate } = require("../../utils/pncMocks");

module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000051RENQASIPNCA05A73000017300000120210827111573000001                                             050001811</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K12/20D     LIVERPOOL               </IDS>
        <CCR>K12/2732/30H                   </CCR>
        <COF>K001    1:9:7:1      OF61016 01062009                </COF>
        <COF>K002    11:6:4:1     PC53001 01062009                </COF>
        <CCR>K12/2732/31J                   </CCR>
        <COF>K001    5:5:2:1      TH68001 01062009                </COF>
      </ASI>
      <GMT>000011073ENQR000051R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K12/20D     LIVERPOOL               </IDS><CCR>K12/2732/30H                   </CCR><COU>I2576                                                                       LIVERPOOL/MARTIN                                      011020090000</COU><CCH>K001              OF61016 </CCH><ADJ>INOT GUILTY   GUILTY        011020090000 </ADJ><DIS>I4004    08102009          00                                                                            </DIS><CCH>K002              PC53001 </CCH><ADJ>INOT GUILTY   GUILTY        011020090000 </ADJ><DIS>I4004    08102009          00                                                                            </DIS>",
    count: 1
  }),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K12/20D     LIVERPOOL               </IDS><ASR>K12/0000/00/12Z                        </ASR><REM>I01102009B    2576                                                                       081020092576                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>",
    count: 1
  }),
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000143RENQASIPNCA05A73000017300000120210827111573000001                                             050002053</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K12/20D     LIVERPOOL               </IDS>
        <CCR>K12/2732/30H                   </CCR>
        <COF>K001    1:9:7:1      OF61016 01062009                </COF>
        <ADJ>INOT GUILTY   GUILTY        011020090000 </ADJ>
        <DIS>I4004    08102009                                                                                        </DIS>
        <COF>K002    11:6:4:1     PC53001 01062009                </COF>
        <ADJ>INOT GUILTY   GUILTY        011020090000 </ADJ>
        <DIS>I4004    08102009                                                                                        </DIS>
        <CCR>K12/2732/31J                   </CCR>
        <COF>K001    5:5:2:1      TH68001 01062009                </COF>
      </ASI>
      <GMT>000015073ENQR000143R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  },
  mockUpdate("CXU04", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K12/20D     LIVERPOOL               </IDS><SUB>I2576                                                                       08102009D</SUB><CCR>K12/2732/30H                   </CCR><CCH>K001              OF61016 </CCH><DIS>I1002M12                   00                                                                            </DIS><CCH>K002              PC53001 </CCH><DIS>I1002M12                   00                                                                            </DIS>",
    count: 1
  }),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K12/20D     LIVERPOOL               </IDS><CCR>K12/2732/31J                   </CCR><COU>I2576                                                                       LIVERPOOL/MARTIN                                      081020090000</COU><CRT>I2576                                                                       12102009</CRT><CCH>K001              TH68001 </CCH><ADJ>INOT GUILTY                         0000 </ADJ><DIS>I2059                      00                                                                            </DIS><ASR>K12/0000/00/12Z                        </ASR><ACH>I                                                                                                                                            TH68151                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     NKINGSTON HIGH STREET                                                                                                                                                                                                                   01ZD02112006                </ACH><ADJ>INOT GUILTY   GUILTY        081020090000 </ADJ><DIS>I1002M14                   00                                                                            </DIS>",
    count: 1
  }),
  mockUpdate("CXU01", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K12/20D     LIVERPOOL               </IDS><ASR>K12/0000/00/12Z                        </ASR><REM>I08102009B    2576                                                                       121020092576                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      0000                                                                                                                                                                              </REM>",
    count: 1
  })
];
