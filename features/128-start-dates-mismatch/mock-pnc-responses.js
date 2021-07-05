const { mockEnquiryFromNCM, dummyUpdate } = require("../../utils/pncMocks");

module.exports = (ncm) => [mockEnquiryFromNCM(ncm), dummyUpdate];
