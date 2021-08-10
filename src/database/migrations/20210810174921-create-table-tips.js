module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "tips",
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                subject: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                text: {
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
            tableName: "tips",
            schema: "massotherapy",
        });
    },
};
