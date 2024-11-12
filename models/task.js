const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user'); // Asegúrate de que esté en la misma ruta

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING
  },
  fecha_vence: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Referencia al modelo User
      key: 'id'
    },
    field: 'user_id'
  }
}, {
  timestamps: false
});

// Definir la relación "una tarea pertenece a un usuario"
Task.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Definir la relación "un usuario tiene muchas tareas"
User.hasMany(Task, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = Task;
