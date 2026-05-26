import { DataTypes, Model } from 'sequelize';
import sequelize from './config.js';

class Denuncia extends Model {}

Denuncia.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING, // Guarda si es sobre un comentario o una foto
    allowNull: false,
  },
  idElementoDenunciado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateDenuncia: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'Denuncia',
  tableName: 'Denuncias'
});

export default Denuncia;