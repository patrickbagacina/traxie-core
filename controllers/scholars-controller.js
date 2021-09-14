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

module.exports.deleteScholar = (req, res) => {
  scholarSvc
    .deleteScholar(req.body)
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
      console.log(`Error on scholar delete`, err);
      res
        .status(400)
        .json({
          message: 'Unexpected error',
          code: 'UNKNOWN_ERROR',
        });
    });
}

module.exports.listScholars = (req, res) => {
  if (req.user) req.query.manager = req.user.user_id;
  
  scholarSvc
    .list(req.query)
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
      console.log(`Error on scholars list`, err);
      res
        .status(400)
        .json({
          message: 'Unexpected error',
          code: 'UNKNOWN_ERROR',
        });
    });
}

module.exports.sync = (req, res) => {
  scholarSvc
    .sync(req.body)
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
      console.log(`Error on scholar sync`, err);
      res
        .status(400)
        .json({
          message: 'Unexpected error',
          code: 'UNKNOWN_ERROR',
        });
    });
}

module.exports.updateScholar = (req, res) => {
  scholarSvc
    .update(req.body)
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
      console.log(`Error on scholar update`, err);
      res
        .status(400)
        .json({
          message: 'Unexpected error',
          code: 'UNKNOWN_ERROR',
        });
    });
}