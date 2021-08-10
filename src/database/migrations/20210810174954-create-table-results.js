module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "results",
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                session_id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNUll: false,
                    references: {
                        model: "sessions",
                        key: "id",
                    },
                },
                duration: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                },
                incidents: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNull: false,
                },
                feedback: {
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
            tableName: "results",
            schema: "massotherapy",
        });
    },
};
