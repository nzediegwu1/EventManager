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
    use_env_variable: databaseUrl,
    dialect: 'postgres',
  },
};
