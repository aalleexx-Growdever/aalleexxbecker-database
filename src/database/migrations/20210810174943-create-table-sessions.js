module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "sessions",
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                date: {
                    type: Sequelize.DataTypes.DATE,
                    allowNUll: false,
                },
                patient_id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNUll: false,
                    references: {
                        model: "patients",
                        key: "id",
                    },
                },
                procedure_id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "procedures",
                        key: "id",
                    },
                },
                objectives: {
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
            tableName: "sessions",
            schema: "massotherapy",
        });
    },
};
