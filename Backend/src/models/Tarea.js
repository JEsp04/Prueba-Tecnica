import {DataTypes} from 'sequelize';
import sequelize from '../config/database.js';

const Tarea = sequelize.define('Tarea', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false, 
},
estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  prioridad: {
    type: DataTypes.ENUM('alta', 'media', 'baja'),
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
},
},
{tableName: "Tareas"}
);

export default Tarea;