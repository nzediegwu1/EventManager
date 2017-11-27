require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

module.exports = {
  development: {
    username: 'admin',
    password: 'password1',
    database: 'EventManager',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'admin',
    password: 'password1',
    database: 'EventManager',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'xcnwqlat',
    password: 'zmYX6GdPo_2tzznPiKoYSCbfPXp_Cci7',
    database: 'xcnwqlat',
    host: 'baasu.db.elephantsql.com',
    dialect: 'postgres',
  },
};
