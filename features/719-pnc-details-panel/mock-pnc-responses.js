module.exports = () => [
  {
    matchRegex: "CXE01",
    response: `<?xml version="1.0" standalone="yes"?>
    <CXE01>
      <GMH>073ENQR000307RENQASIPNCA05A73000017300000120210901124873000001                                             050002293</GMH>
      <ASI>
        <FSC>K01ZD</FSC>
        <IDS>K21/6A      LEBOWSKI                </IDS>
        <CCR>K21/2732/6N                    </CCR>
        <COF>K001    5:5:5:1      TH68001 28112010                </COF>
        <ADJ>INOT GUILTY   GUILTY        250920110000 </ADJ>
        <DIS>I2007                                                                                                    </DIS>
        <COF>K002    5:7:11:10    TH68151 28112010                </COF>
        <ADJ>INOT GUILTY   GUILTY        250920110000 </ADJ>
        <DIS>I2007                                                                                                    </DIS>
        <CCR>K21/2732/6R                    </CCR>
        <COF>K003    12:15:13:1   RT88191 28112010                </COF>
        <ADJ>INOT GUILTY   GUILTY        250920110000 </ADJ>
        <DIS>I2007                                                                                                    </DIS>
      </ASI>
      <GMT>000016073ENQR000307R</GMT>
    </CXE01>`,
    expectedRequest: "",
    count: 1
  }
];
