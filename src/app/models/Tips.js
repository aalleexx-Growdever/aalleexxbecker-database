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
}

export default Tip;
