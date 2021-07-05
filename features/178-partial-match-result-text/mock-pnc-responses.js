const { mockEnquiryFromNCM, mockUpdate } = require("../../utils/pncMocks");

module.exports = [
  mockEnquiryFromNCM("178"),
  mockUpdate("CXU02", {
    expectedRequest:
      "<FSC>K01YZ</FSC><IDS>K00/411417B TEXT                    </IDS><CCR>K97/1626/8395Q                 </CCR><COU>I2732                                                                       TEXT/MARCUS                                           011020110000</COU><CCH>K001              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><DIS>I3025Y3                    00            SEA MONKEY                                                      </DIS><CCH>K002              TH68010 </CCH><ADJ>INOT GUILTY   GUILTY        011020110000 </ADJ><DIS>I1002M12                   00                                                                            </DIS><DIS>I3025Y999                  00            SEA MONKEY                                                      </DIS>"
  })
];
