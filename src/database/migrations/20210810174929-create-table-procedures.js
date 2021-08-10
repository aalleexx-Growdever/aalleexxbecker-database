module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "procedures",
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
                description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNull: false,
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
            tableName: "procedures",
            schema: "massotherapy",
        });
    },
};
