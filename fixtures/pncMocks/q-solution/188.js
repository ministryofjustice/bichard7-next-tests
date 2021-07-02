const { mockEnquiryFromNCM, mockUpdate } = require("../../../utils/pncMocks");

module.exports = [
  mockEnquiryFromNCM("188"),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/410926T BISHOP                  </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       BISHOP/CHARLES                                        011020110000</COU><CCH>K001              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><DIS>I1015            0000100.0000                                                                            </DIS><CCH>K002              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><DIS>I1015            0000100.0000                                                                            </DIS><CCH>K003              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><DIS>I1015            0000100.0000                                                                            </DIS><CCH>K004              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><DIS>I1015            0000200.0000                                                                            </DIS><CCH>K005              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><DIS>I1015            0000200.0000                                                                            </DIS><CCH>K006              TH68006 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><DIS>I1015            0000200.0000                                                                            </DIS>"
  })
];
