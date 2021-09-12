const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  const auth = req.headers['authorization'];

  if (!auth) 
    return res.status(403)
      .json({
        message: 'Forbidden request',
        code: 'FORBIDDEN'
      });

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;
  } catch (err) {
    console.log('Error on authorization', err);
    return res.status(401)
      .json({
        message: 'Unauthorized request',
        code: 'UNAUTHORIZED'
      });
  }
  return next();
};