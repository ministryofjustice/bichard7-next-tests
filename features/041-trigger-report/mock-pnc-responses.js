const { mockEnquiryFromNCM, dummyUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [
  { ...mockEnquiryFromNCM(ncm.replace("pnc-data.xml", "pnc-data-1.xml")), count: 1 },
  { ...mockEnquiryFromNCM(ncm.replace("pnc-data.xml", "pnc-data-2.xml")), count: 1 },
  dummyUpdate
];
