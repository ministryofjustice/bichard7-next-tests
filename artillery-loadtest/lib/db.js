const pgp = require("pg-promise")();

function connect() {
  if (!global.postgresConnection) {
    global.postgresConnection = pgp({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      database: "bichard",
      user: process.env.DB_USER || "bichard",
      password: process.env.DB_PASSWORD || "password",
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
    });
  }
  return global.postgresConnection;
}

async function createPostgresUser(userid) {
  const db = connect();

  const defaultPasswordHash =
    "$argon2id$v=19$m=15360,t=2,p=1$CK/shCsqcAng1U81FDzAxA$UEPw1XKYaTjPwKtoiNUZGW64skCaXZgHrtNraZxwJPw";
  try {
    const user = await db.one(
      "insert into br7own.users (username, email, exclusion_list, inclusion_list, visible_courts, visible_forces, excluded_triggers, forenames, surname, password) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id, username, email",
      [userid, `${userid}@artillery-user.com`, "", "01", "", "01", "", "", userid, defaultPasswordHash]
    );

    await db.none(
      "insert into br7own.users_groups (user_id, group_id) values ($1, (select id from br7own.groups where name = 'B7Supervisor_grp'))",
      [user.id]
    );
    return user;
  } catch (e) {
    console.log("Error quering postgres");
    return { email: "unknown@example.com" };
  }
}

async function cleanupPostgresUser(email) {
  const db = await connect();

  await db.none(
    "WITH d_users as (DELETE FROM br7own.users WHERE email = $1 RETURNING id) DELETE FROM br7own.users_groups WHERE user_id IN (SELECT id FROM d_users)",
    [email]
  );
}

async function cleanupAllPostgresUsers() {
  const db = await connect();

  await db.none(
    "WITH d_users as (DELETE FROM br7own.users WHERE email LIKE '%@artillery-user.com' RETURNING id) DELETE FROM br7own.users_groups WHERE user_id IN (SELECT id FROM d_users)"
  );
}

async function getVerifyToken(email) {
  const db = await connect();
  try {
    const result = await db.one("SELECT email_verification_code FROM br7own.users WHERE email = $1", [email]);
    return result.email_verification_code;
  } catch (e) {
    console.log("Error quering postgres for verification code");
    return "unknown";
  }
}

module.exports = {
  createPostgresUser,
  cleanupPostgresUser,
  cleanupAllPostgresUsers,
  getVerifyToken
};
