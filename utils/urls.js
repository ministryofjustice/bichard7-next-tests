const { getConfig } = require("./config");

const url = (path) => `${getConfig().baseUrl}${path}`;

const home = () => url("/bichard-ui");
const initialRefreshUrl = () => url("/bichard-ui/InitialRefreshList");
const logout = () => url("/bichard-ui/bichard-lo");

const userService = () => getConfig().usersUrl;

module.exports = {
  home,
  initialRefreshUrl,
  logout,
  userService
};
