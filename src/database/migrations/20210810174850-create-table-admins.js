module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "admins",
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                login: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                    unique: true,
                },
                password_hash: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                created_at: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                schema: "massotherapy",
            }
        );
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable({
            tableName: "admins",
            schema: "massotherapy",
        });
    },
};
