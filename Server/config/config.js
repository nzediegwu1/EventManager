module.exports = {
    development: {
        /*
        username: 'admin',
        password: 'password1',
        database: 'EventManager',
        host: '127.0.0.1',
        dialect: 'postgres',*/
        username: 'omkcdhmt',
        password: 'rxAH5VckpPKKQlg0dGyk5fbELSipPo3X',
        database: 'omkcdhmt',
        host: 'baasu.db.elephantsql.com',
        port: '5432',
        dialect: 'postgres',

    },
    test: {
        username: 'omkcdhmt',
        password: 'rxAH5VckpPKKQlg0dGyk5fbELSipPo3X',
        database: 'omkcdhmt',
        host: 'baasu.db.elephantsql.com',
        port: '5432',
        dialect: 'postgres',
    },
    production: {
        use_env_variable: 'DATABASE_URL_PRODUCTION',
        dialect: 'postgres',
    },
};
