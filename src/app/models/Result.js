import Sequelize, { Model } from 'sequelize';

class Result extends Model {
  static init(sequelize) {
    super.init(
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
            model: 'sessions',
            key: 'id',
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
      },
      {
        sequelize,
        schema: 'massotherapy',
        tableName: 'results',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Session, {
      as: 'session_result',
      foreignKey: 'id',
      sourceKey: 'session_id',
    });
  }
}

export default Result;
