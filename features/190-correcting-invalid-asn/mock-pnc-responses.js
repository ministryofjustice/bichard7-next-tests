const { dummyUpdate, mockEnquiryFromNCM } = require("../../utils/pncMocks")

module.exports = (ncm, world = {}) => [mockEnquiryFromNCM(ncm, world), dummyUpdate]
