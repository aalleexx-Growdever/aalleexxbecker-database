import Sequelize, { Model } from 'sequelize';

class Tip extends Model {
    static init(sequelize) {
        super.init(
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
            },
            {
                sequelize,
                schema: 'massotherapy',
                tableName: 'tips',
            }
        );

        return this;
    }

    static parseConditions(data) {
        const { subject } = data;

        const conditions = {};

        if (subject) {
            conditions.subject = subject;
        }

        return { conditions };
    }
}

export default Tip;
