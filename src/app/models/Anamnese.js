import Sequelize, { Model } from 'sequelize';

class Anamnese extends Model {
    static init(sequelize) {
        super.init(
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
                        model: 'patients',
                        key: 'id',
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
                    allowNUll: true,
                    defaultValue: null,
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
                    allowNUll: true,
                    defaultValue: null,
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
                    allowNUll: true,
                    defaultValue: null,
                },
                medical_treatment: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                treatment_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                    defaultValue: null,
                },
                allergy: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                allergy_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                    defaultValue: null,
                },
                recent_surgery: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                surgery_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                    defaultValue: null,
                },
                tumor_or_cancer: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                tumor_or_cancer_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                    defaultValue: null,
                },
                skin_problems: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                skin_problems_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                    defaultValue: null,
                },
                orthopedic_problems: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                orthopedic_problems_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                    defaultValue: null,
                },
                prosthesis: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                prosthesis_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                    defaultValue: null,
                },
                acute_inflammation: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                inflammation_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                    defaultValue: null,
                },
                necessary_information: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
                information_description: {
                    type: Sequelize.DataTypes.TEXT,
                    allowNUll: true,
                    defaultValue: null,
                },
            },
            {
                sequelize,
                schema: 'massotherapy',
                tableName: 'anamneses',
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Patient, {
            as: 'patient',
            foreignKey: 'patient_id',
        });
    }

    static parseConditions(data) {
        const { name } = data;

        const conditions = {};

        if (name) {
            conditions.name = name;
        }

        return { conditions };
    }
}

export default Anamnese;
