const { config } = require("./config");

const url = (path) => `${config.baseUrl}${path}`;

const caseListPage = () => (process.env.nextUI ? url("/bichard") : url("/bichard-ui/InitialRefreshList"));
const authenticateUrl = (token) => url(`/bichard-ui/Authenticate?token=${token}`);
const logout = () => url("/bichard-ui/bichard-lo");
const login = () => url("/users/login");

module.exports = {
  login,
  caseListPage,
  authenticateUrl,
  logout
};
