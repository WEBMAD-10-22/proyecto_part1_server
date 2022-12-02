const jwt = require('jsonwebtoken');

// NO SE OCURRA PONER ESTOY AQUÍ, VA EN EL .ENV.
const signJwt = (idUser, email) => {
  return jwt.sign({ email }, 'SECRET', { expiresIn: '7d', subject: idUser });
};

const verifyJwt = (token) => {
  return jwt.verify(token, 'SECRET');
};

module.exports = {
  signJwt,
  verifyJwt,
};
