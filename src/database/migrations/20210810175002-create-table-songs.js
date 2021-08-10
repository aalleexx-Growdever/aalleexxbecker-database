module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "songs",
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
                url: {
                    type: Sequelize.DataTypes.STRING,
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
            tableName: "songs",
            schema: "massotherapy",
        });
    },
};
