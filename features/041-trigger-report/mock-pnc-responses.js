const { mockEnquiryFromNCM, dummyUpdate } = require("../../utils/pncMocks")

module.exports = (ncm, world = {}) => [
  { ...mockEnquiryFromNCM(ncm.replace("pnc-data.xml", "pnc-data-1.xml"), world), count: 1 },
  { ...mockEnquiryFromNCM(ncm.replace("pnc-data.xml", "pnc-data-2.xml"), world), count: 1 },
  dummyUpdate
]
