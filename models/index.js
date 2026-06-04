import User from './user.js';
import Publicacion from './Publicacion.js';
import Comentario from './Comentario.js';
import Favorito from './Favorito.js';
import Notificacion from './Notificacion.js';
import Denuncia from './Denuncia.js';
import MensajePrivado from './MensajePrivado.js';

// 1. Relaciones de Publicación (Un Usuario tiene muchas, una Publicación pertenece a un Usuario)
User.hasMany(Publicacion, { foreignKey: 'idUser' });
Publicacion.belongsTo(User, { foreignKey: 'idUser' });

// 2. Relaciones de Comentarios
User.hasMany(Comentario, { foreignKey: 'idUser' });
Comentario.belongsTo(User, { foreignKey: 'idUser' });

Publicacion.hasMany(Comentario, { foreignKey: 'idpublicacion' });
Comentario.belongsTo(Publicacion, { foreignKey: 'idpublicacion' });

// 3. Relaciones de Favoritos
User.hasMany(Favorito, { foreignKey: 'idUser' });
Favorito.belongsTo(User, { foreignKey: 'idUser' });

// 4. Relaciones de Notificaciones (Acción y Destinatario)
User.hasMany(Notificacion, { foreignKey: 'idUserDeAccion', as: 'Acciones' });
Notificacion.belongsTo(User, { foreignKey: 'idUserDeAccion', as: 'UsuarioOrigen' });

User.hasMany(Notificacion, { foreignKey: 'idUserdestinatario', as: 'NotificacionesRecibidas' });
Notificacion.belongsTo(User, { foreignKey: 'idUserdestinatario', as: 'UsuarioDestino' });

// 5. Relaciones de Denuncias
User.hasMany(Denuncia, { foreignKey: 'idUser' });
Denuncia.belongsTo(User, { foreignKey: 'idUser' });

// 6. Relaciones de Mensajes Privados (Comprador y Vendedor)
User.hasMany(MensajePrivado, { foreignKey: 'idComprador', as: 'MensajesEnviados' });
MensajePrivado.belongsTo(User, { foreignKey: 'idComprador', as: 'Comprador' });

User.hasMany(MensajePrivado, { foreignKey: 'idVendedor', as: 'MensajesRecibidos' });
MensajePrivado.belongsTo(User, { foreignKey: 'idVendedor', as: 'Vendedor' });

export {
  User,
  Publicacion,
  Comentario,
  Favorito,
  Notificacion,
  Denuncia,
  MensajePrivado
};