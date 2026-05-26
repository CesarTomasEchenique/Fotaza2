import { DataTypes, Model } from 'sequelize';
import sequelize from './config.js';

class MensajePrivado extends Model {}

MensajePrivado.init({
  idMP: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idFoto: {
    type: DataTypes.INTEGER,
    allowNull: true, // Por si se envían mensajes sin adjuntar foto obligatoria
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'MensajePrivado',
  tableName: 'MensajesPrivados'
});

export default MensajePrivado;