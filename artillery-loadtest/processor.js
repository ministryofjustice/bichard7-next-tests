const jwt = require("jsonwebtoken");
const { createPostgresUser, cleanupPostgresUser, getVerifyToken, cleanupAllPostgresUsers } = require("./lib/db");

async function createUser(ctx, ee, next) {
  /* eslint-disable no-underscore-dangle */
  const user = await createPostgresUser(ctx._uid);
  ctx.vars.email = user.email;
  return next();
}

async function cleanupUser(ctx, ee, next) {
  await cleanupPostgresUser(ctx.vars.email);
  return next();
}

async function cleanupAllUsers(ctx, ee, next) {
  await cleanupAllPostgresUsers();
  return next();
}

async function generateVerifyToken(requestParams, ctx, ee, next) {
  const tokenSecret = process.env.TOKEN_SECRET || "OliverTwist";
  const issuer = process.env.TOKEN_ISSUER || "Bichard";
  const verificationCode = await getVerifyToken(ctx.vars.email);
  const tokenData = { emailAddress: ctx.vars.email, verificationCode };
  ctx.vars.token = jwt.sign(tokenData, tokenSecret, { issuer });
  next();
}

function debug(requestParams, response, context, ee, next) {
  console.log(response.statusCode);
  console.log(response.headers);
  next();
}

module.exports = {
  createUser,
  cleanupUser,
  cleanupAllUsers,
  generateVerifyToken,
  debug
};
