import Sequelize, { Model } from "sequelize";

class Patient extends Model {
    static init(sequelize) {
        super.init(
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
                    defaultValue: null,
                    references: {
                        model: "patients",
                        key: "id",
                    },
                },
            },
            {
                sequelize,
                schema: "massotherapy",
                tableName: "patients",
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Patient, {
            as: "recommender",
            foreignKey: "recommender_id",
        });

        this.hasOne(models.Anamnese, {
            as: "anamnese",
            foreignKey: "patient_id",
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

export default Patient;
