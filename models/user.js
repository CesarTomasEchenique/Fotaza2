import {Model , DataTypes } from "sequelize";
import sequelize from "./config.js";

class user extends Model {}

user.init({

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
    },
     firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
     },
     lastName: {
        type : DataTypes.STRING(50),
        allowNull: false
     },
     email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

     },
     cumpleanos: {
        type: DataTypes.DATEONLY
     },
     phone:{
        type: DataTypes.STRING,
        allowNull: false
     }

},
{
    sequelize,
    modelName: 'User',
    createdAt: true,
    deletedAt: true ,

})

export default user;
//User, id, name,lastname,cumpleanos, email,phone,
//auditoria = createAt , deleteAt => null | date