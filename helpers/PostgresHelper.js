const pgp = require("pg-promise")();

pgp.pg.types.setTypeParser(1082, (stringValue) => stringValue);

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

  async createUser(name, groups, inclusionList, exclusionList, visibleCourts, visibleForces, excludedTriggers) {
    const defaultPasswordHash =
      "$argon2id$v=19$m=15360,t=2,p=1$CK/shCsqcAng1U81FDzAxA$UEPw1XKYaTjPwKtoiNUZGW64skCaXZgHrtNraZxwJPw";
    const { id } = await this.pg.one(
      `insert into br7own.users \
        (username, email, exclusion_list, inclusion_list, visible_courts, \
          visible_forces, excluded_triggers,forenames, surname, password, feature_flags) \
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (lower(email)) DO \
          UPDATE SET email = EXCLUDED.email, exclusion_list = EXCLUDED.exclusion_list, \
            inclusion_list = EXCLUDED.inclusion_list, visible_courts = EXCLUDED.visible_courts,\
            visible_forces = EXCLUDED.visible_forces, excluded_triggers = EXCLUDED.excluded_triggers, \
            forenames = EXCLUDED.forenames, surname = EXCLUDED.surname, password = EXCLUDED.password, \
            feature_flags = EXCLUDED.feature_flags
            returning id`,
      [
        name,
        `${name}@example.com`,
        exclusionList.join(","),
        inclusionList.join(","),
        visibleCourts.join(","),
        visibleForces.join(","),
        excludedTriggers.join(","),
        "",
        name,
        defaultPasswordHash,
        { exceptionsEnabled: true, offenceMatchingEnabled: true }
      ]
    );

    const groupPromises = groups.map((group) =>
      this.pg.none(
        "insert into br7own.users_groups (user_id, group_id) values ($1, (select id from br7own.groups where name = $2)) ON CONFLICT DO NOTHING",
        [id, `${group}_grp`]
      )
    );
    await Promise.all(groupPromises);
  }

  // eslint-disable-next-line class-methods-use-this
  async closeConnection() {
    pgp.end();
  }

  // eslint-disable-next-line class-methods-use-this
  async dumpData() {
    const errorList = await global.postgresConnection.any("select * from BR7OWN.ERROR_LIST");
    const errorListTriggers = await global.postgresConnection.any("select * from BR7OWN.ERROR_LIST_TRIGGERS");
    return { errorList, errorListTriggers };
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
