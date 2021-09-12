const accountSvc = require('../services/user-service');

const register = (req, res) => {
  accountSvc
    .register(req.body)
    .then((data, err) => {
      if (err) {
        res
          .status(400)
          .json({
            message: err.message,
            name: err.name,
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

module.exports = {
  register,
};
