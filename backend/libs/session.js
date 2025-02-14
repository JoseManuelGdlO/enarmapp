const jwt = require('jsonwebtoken');
const redisClient = require('./redis');

const sessionValidator = async (req, res, next) => {
  try {    
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    const decoded = jwt.verify(token, 'secretkey');
    const id = decoded.data.data.data.email;
    
    const activeToken = await redisClient.get(id);  // Obtener el token activo
    console.log('activeToken', activeToken);
    
    if (activeToken && activeToken !== token) {
      return res.status(401).json({ message: 'Sesión inválida, otra sesión detectada' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = sessionValidator;
