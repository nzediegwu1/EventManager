module.exports = {
  development: {
    username: 'admin',
    password: 'password1',
    database: 'EventManager',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL_PRODUCTION',
    dialect: 'postgres',
  },
};
