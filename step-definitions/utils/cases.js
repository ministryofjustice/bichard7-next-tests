const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

async function insert() {
  const specFolder = path.dirname(this.featureUri);
  const correlationId = randomUUID();
  await this.auditLogApi.createAuditLogMessage(correlationId);

  let file = String(fs.readFileSync(`${specFolder}/case.sql`));
  file = file.replace(/REPLACE_MESSAGE_ID/g, correlationId);
  await this.db.query(file);
}

module.exports = {
  insert
};
