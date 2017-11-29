module.exports = {
    development: {
        username: 'txvdyccl',
        password: 'w2YlzmPt5T5SvrFbjDnnZ9bGb6Vd0Ttl',
        database: 'txvdyccl',
        host: 'tantor.db.elephantsql.com',
        port: '5432',
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
        use_env_variable: 'DATABASE_URL_PRODUCTION',
        dialect: 'postgres',
    },
};
