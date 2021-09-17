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
      "$shiro1$SHA-256$500000$sL5A3oRuVXTJCy36WP5Kyg==$ggXBhVWqFN35dRW/TXWO7Dm/zEwWxNu4CuwXNvEJ8Jw=";
    const existing = await this.pg.one("SELECT count(*) FROM br7own.users WHERE lower(username) = $1", [
      name.toLowerCase()
    ]);
    if (existing.count !== "1") {
      const {
        id
      } = await this.pg.one(
        "insert into br7own.users (username, email, active, exclusion_list, inclusion_list, challenge_response, forenames, surname, password) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id",
        [
          name,
          `${name}@example.com`,
          true,
          "",
          inclusionList.join(","),
          exclusionList.join(","),
          name,
          name,
          defaultPasswordHash
        ]
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
    const updateQuery = `
      UPDATE br7own.users
      SET email_verification_code = $1
      WHERE email = $2
    `;
    await global.postgresConnection.any(updateQuery, [process.env.VERIFICATION_CODE, emailAddress]);
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
