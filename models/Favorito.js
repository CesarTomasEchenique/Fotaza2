import { DataTypes, Model } from 'sequelize';
import sequelize from './config.js';

class Favorito extends Model {}

Favorito.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nameColeccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'Favorito',
  tableName: 'Favoritos'
});

export default Favorito;