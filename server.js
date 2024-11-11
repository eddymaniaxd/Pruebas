const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./utils/errorMiddleware');
const indexRouter = require('./routes/indexRouter');
var router = express.Router();

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);



// Middleware de manejo de errores
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

//module.exports = app;