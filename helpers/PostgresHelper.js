const pgp = require("pg-promise")();

class PostgresHelper {
  constructor(options) {
    if (!global.postgresConnection) {
      global.postgresConnection = pgp(options);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async clearExceptions() {
    return global.postgresConnection.none("delete from BR7OWN.ERROR_LIST");
  }

  // eslint-disable-next-line class-methods-use-this
  async closeConnection() {
    pgp.end();
  }
}

module.exports = PostgresHelper;
