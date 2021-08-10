module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "anamneses",
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                patient_id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNUll: false,
                    references: {
                        model: "patients",
                        key: "id",
                    },
                },
                smoker: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                },
                circulatory_disorder: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                },
                workout: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                regular_menstrual_cicle: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                diabetes: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                heart_problems: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                hormonal_disorder: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                blood_pressure: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                pacemaker: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                varicose_veins_or_thrombosis: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                pregnant: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                medical_treatment: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                treatment_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                },
                allergy: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                allergy_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                },
                recent_surgery: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                surgery_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                },
                tumor_or_cancer: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                tumor_or_cancer_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                },
                skin_problems: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                skin_problems_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                },
                orthopedic_problems: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                orthopedic_problems_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                },
                prosthesis: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                prosthesis_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                },
                acute_inflammation: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                inflammation_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                },
                necessary_information: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                information_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
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
            tableName: "anamneses",
            schema: "massotherapy",
        });
    },
};
