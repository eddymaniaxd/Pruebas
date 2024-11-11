const Task = require('../models/task');

// Crear tarea
const createTask = async (req, res) => {
  const { nombre, descripcion, fecha_vence } = req.body;
  const userId = req.user.id;

  try {
    const newTask = await Task.create({ nombre, descripcion, fecha_vence, userId });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};

// Obtener todas las tareas del usuario
const getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.findAll({ where: { userId } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
};

// Obtener una tarea específica
const getTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea', error });
  }
};

// Actualizar tarea
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { nombre, descripcion, fecha_vence } = req.body;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    task.nombre = nombre || task.nombre;
    task.descripcion = descripcion || task.descripcion;
    task.fecha_vence = fecha_vence || task.fecha_vence;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
};

// Eliminar tarea
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
