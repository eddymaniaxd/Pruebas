const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//GETALLUSER
const getallUsers = async (req, res) => {
  
  try {
  const users = await User.findAll();
    res.status(200).json(
     users
    );
  } catch (error) {
    res.status(500).json({ message: 'Error', error });
  }
};

// Registro de usuario
const registerUser = async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;

  try {
    const existingUser = await User.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    const hashedContrasena = await bcrypt.hash(contrasena, 10);
    const newUser = await User.create({ nombre, apellido, correo, contrasena: hashedContrasena });

    res.status(201).json({
      id: newUser.id,
      nombre: newUser.nombres,
      apellido: newUser.apellido,
      correo: newUser.correo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await User.findOne({ where: { correo } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isContrasenaValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isContrasenaValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login exitoso',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

module.exports = { registerUser, loginUser };
