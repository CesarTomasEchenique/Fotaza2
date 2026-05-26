import { DataTypes, Model } from 'sequelize';
import sequelize from './config.js';

class Notificacion extends Model {}

Notificacion.init({
  idNot: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipoEvento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'Notificacion',
  tableName: 'Notificaciones'
});

export default Notificacion;