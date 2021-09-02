const { dummyUpdate, mockEnquiryFromNCM } = require("../../utils/pncMocks");

module.exports = (ncm) => [mockEnquiryFromNCM(ncm), dummyUpdate];
