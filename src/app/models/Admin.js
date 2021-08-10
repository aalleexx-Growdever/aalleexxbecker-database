import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Admin extends Model {
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
                login: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.DataTypes.VIRTUAL,
                },
                password_hash: {
                    type: Sequelize.DataTypes.STRING,
                    allowNUll: false,
                },
            },
            {
                sequelize,
                schema: "massotherapy",
                tableName: "admins",
            }
        );

        this.addHook("beforeSave", async (admin) => {
            if (admin.password) {
                admin.password_hash = await bcrypt.hash(admin.password, 8);
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
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

export default Admin;
