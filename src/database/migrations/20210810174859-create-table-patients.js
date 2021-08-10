module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "patients",
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
                birthdate: {
                    type: Sequelize.DataTypes.DATEONLY,
                    allowNull: false,
                },
                contact: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                },
                genre: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                how_met: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                recommender_id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: "patients",
                        key: "id",
                    },
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
            tableName: "patients",
            schema: "massotherapy",
        });
    },
};
