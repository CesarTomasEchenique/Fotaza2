import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";
import bcrypt from 'bcrypt';
import { genSalt, hash } from 'bcrypt';

export class user extends Model {
    async validarContrasena(password) {
      return await bcrypt.compare(password, this.password);
   }
 }



user.init({

   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
         isEmail: "tiene que ser un email valido"
      }
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   cumpleanos: {
      type: DataTypes.DATEONLY
   },
   phone: {
      type: DataTypes.STRING,
      allowNull: false
   }

},
{
      sequelize,
      modelName: 'User',
      createdAt: true,
      deletedAt: true,
      hooks: {
         beforeSave: async (user) => {
            if (user.password) {
               const salt = await genSalt(10);
               user.password = await hash(user.password, salt);
            }
         }
      }  
});

export default user;
//User, id, name,lastname,cumpleanos, email,phone,
//auditoria = createAt , deleteAt => null | date