import Sequelize, { Model } from 'sequelize';

class Procedure extends Model {
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
        description: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        schema: 'massotherapy',
        tableName: 'procedures',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Session, {
      as: 'procedure',
      foreignKey: 'procedure_id',
    });
  }
}

export default Procedure;
