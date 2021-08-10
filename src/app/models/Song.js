import Sequelize, { Model } from 'sequelize';

class Song extends Model {
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
        url: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        schema: 'massotherapy',
        tableName: 'songs',
      }
    );

    return this;
  }
}

export default Song;
