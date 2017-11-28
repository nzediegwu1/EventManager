module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Events', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
        },
        venue: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.DATE,
        },
        description: {
            type: Sequelize.TEXT,
        },
        picture: {
            type: Sequelize.STRING, // image url
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
                as: 'userId',
            },
        },
        centerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Centers',
                key: 'id',
                as: 'centerId',
            },
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Events'),
};
