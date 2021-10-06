const pgp = require("pg-promise")();

class PostgresHelper {
  constructor(options) {
    if (!global.postgresConnection) {
      global.postgresConnection = pgp(options);
    }
    this.pg = global.postgresConnection;
  }

  // eslint-disable-next-line class-methods-use-this
  async clearExceptions() {
    return this.pg.none("delete from BR7OWN.ERROR_LIST");
  }

  async createUser(name, groups, inclusionList, exclusionList) {
    const defaultPasswordHash =
      "$argon2id$v=19$m=15360,t=2,p=1$CK/shCsqcAng1U81FDzAxA$UEPw1XKYaTjPwKtoiNUZGW64skCaXZgHrtNraZxwJPw";
    const existing = await this.pg.one("SELECT count(*) FROM br7own.users WHERE lower(username) = $1", [
      name.toLowerCase()
    ]);
    if (existing.count !== "1") {
      const {
        id
      } = await this.pg.one(
        "insert into br7own.users (username, email, exclusion_list, inclusion_list, forenames, surname, password) values ($1, $2, $3, $4, $5, $6, $7) returning id",
        [name, `${name}@example.com`, "", inclusionList.join(","), exclusionList.join(","), name, defaultPasswordHash]
      );

      const groupPromises = groups.map((group) =>
        this.pg.none(
          "insert into br7own.users_groups (user_id, group_id) values ($1, (select id from br7own.groups where name = $2))",
          [id, `${group}_grp`]
        )
      );
      await Promise.all(groupPromises);
    }
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
  async resetEmailVerificationCode(emailAddress) {
    const query = `
      UPDATE br7own.users
      SET email_verification_code = $1
      WHERE email = $2
    `;
    await global.postgresConnection.any(query, [process.env.VERIFICATION_CODE, emailAddress]);
  }

  // eslint-disable-next-line class-methods-use-this
  async getEmailVerificationCode(emailAddress) {
    if (process.env.RUN_PARALLEL) {
      // only need this logic when running in parallel
      const updateQuery = `
        UPDATE br7own.users
        SET email_verification_code = $1
        WHERE email = $2
      `;
      await global.postgresConnection.any(updateQuery, [process.env.VERIFICATION_CODE, emailAddress]);
    }
    const query = `
      SELECT email_verification_code
      FROM br7own.users
      WHERE email = $1
    `;
    const result = await global.postgresConnection.one(query, emailAddress);
    return result.email_verification_code;
  }

  async getMatchingErrorRecords(name) {
    const query = `SELECT * FROM br7own.error_list WHERE defendant_name = $1`;
    return this.pg.any(query, [name]);
  }

  async query(sql) {
    return this.pg.none(sql);
  }
}

module.exports = PostgresHelper;
