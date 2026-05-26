
import { DataTypes, Model } from 'sequelize';
import sequelize from './config.js';

class Comentario extends Model {}

Comentario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  contenido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estadoActivo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
}, {
  sequelize,
  modelName: 'Comentario',
  tableName: 'Comentarios'
});

export default Comentario;