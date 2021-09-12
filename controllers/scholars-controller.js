const scholarSvc = require('../services/scholar-service');

module.exports.createScholar = (req, res) => {
  if (req.user) req.body.manager = req.user.user_id;
  
  scholarSvc
    .create(req.body)
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
      console.log(`Error on scholar create`, err);
      res
        .status(400)
        .json({
          message: 'Unexpected error',
          code: 'UNKNOWN_ERROR',
        });
    });
}