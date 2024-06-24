const { config } = require("./config");

const url = (path) => `${config.baseUrl}${path}`;

const caseListPage = () => url("/bichard");
const authenticateUrl = (token) => url(`/bichard-ui/Authenticate?token=${token}`);
const logout = () => url("/bichard-ui/bichard-lo");
const login = () => url("/users/login");

module.exports = {
  login,
  caseListPage,
  authenticateUrl,
  logout
};
