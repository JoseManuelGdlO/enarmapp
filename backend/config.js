const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      // aws rds
      // host: "medbrain-dev.cxcex64atlct.us-east-1.rds.amazonaws.com",
      // user: "admin",
      // password: "7ZicQyUwv0aNGollri1H",
      // database: "enarm_db",
      // local
      host: "127.0.0.1",
      user: "root",
      password: "enarm_db",
      database: "enarm_db",
    },
    listPerPage: 10,
  };
  module.exports = config;
