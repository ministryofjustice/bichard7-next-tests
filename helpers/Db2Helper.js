const db2 = require("ibm_db");

class Db2Helper {
  constructor(options) {
    this.connStr = `DATABASE=${options.database};HOSTNAME=${options.host};UID=${options.user};PWD=${options.password};PORT=${options.port};PROTOCOL=TCPIP`;
    this.conn = null;
  }

  async connect() {
    if (this.conn) return null;
    return db2.open(this.connStr).then(
      (conn) => {
        this.conn = conn;
      },
      (err) => {
        console.log(err);
        throw err;
      }
    );
  }

  async clearExceptions() {
    await this.connect();
    try {
      await this.conn.query("delete from BR7OWN.ERROR_LIST;");
    } catch (err) {
      if (err.state !== "01504") throw err;
    }
  }

  async closeConnection() {
    if (!this.conn) return null;

    return db2.close();
  }
}

module.exports = Db2Helper;
