const pgp = require("pg-promise")();

class DbHelper {
  constructor(options) {
    this.conn = pgp(options);
  }

  async clearExceptions() {
    return this.conn.none("delete from BR7OWN.ERROR_LIST");
  }
}

module.exports = DbHelper;
