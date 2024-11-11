const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
  };
  
  module.exports = errorMiddleware;
  