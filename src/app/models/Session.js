import Sequelize, { Model } from 'sequelize';

class Session extends Model {
  static init(sequelize) {
    super.init(
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
            model: 'patients',
            key: 'id',
          },
        },
        procedure_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'procedures',
            key: 'id',
          },
        },
        objectives: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        schema: 'massotherapy',
        tableName: 'sessions',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Patient, {
      as: 'patient',
      foreignKey: 'id',
      sourceKey: 'patient_id',
    });

    this.belongsTo(models.Procedure, {
      as: 'procedure',
      foreignKey: 'id',
      sourceKey: 'procedure_id',
    });
  }
}

export default Session;
