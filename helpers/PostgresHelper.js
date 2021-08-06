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

  // eslint-disable-next-line class-methods-use-this
  async dumpData() {
    return global.postgresConnection.any("select * from BR7OWN.ERROR_LIST");
  }

  // eslint-disable-next-line class-methods-use-this
  async getEmailVerificationCode(emailAddress) {
    const query = `
      SELECT email_verification_code
      FROM br7own.users
      WHERE email = $1
    `;
    const result = await global.postgresConnection.one(query, emailAddress);
    return result.email_verification_code;
  }
}

module.exports = PostgresHelper;
