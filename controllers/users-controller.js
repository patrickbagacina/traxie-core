const accountSvc = require('../services/user-service');

module.exports.login = (req, res) => {
  accountSvc
    .login(req.body)
    .then((result) => {
      if (result.error) {
        res
          .status(400)
          .json({
            message: result.error.message,
            code: result.error.code,
          });
      } else {
        res.json({
          status: 'OK',
          data: result
        });
      }
    })
    .catch(err => {
      console.log(`Error on login`, err);
    });
}

module.exports.register = (req, res) => {
  accountSvc
    .register(req.body)
    .then((result) => {
      if (result.error) {
        res
          .status(400)
          .json({
            message: result.error.message,
            code: result.error.code,
          });
      } else {
        res.json({
          status: 'OK',
          data: data
        });
      }
    })
    .catch(err => {
      console.log(`Error on register`, err);
    });
}