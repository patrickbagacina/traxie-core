// const ship = require('../models/ship');
// const shipSvc = require('../service/ship-service');
// const ex = require('../api/exceptions');

const listScholars = (req, res) => {
  res.json({
    status: 'OK'
  });
  // const query = {
  //   ship_type: req.query.ship_type,
  //   weight: req.query.weight,
  //   home_port: req.query.home_port,
  // };
  // const opts = {
  //   limit: req.query.limit,
  //   offset: req.query.offset,
  //   sort: req.query.sort,
  //   order: req.query.order,
  // };
  
  // shipSvc.list(query, opts)
  //   .then((ships) => {
  //     res
  //     .status(200)
  //     .cache(ships);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res
  //       .status(400)
  //       .json({
  //         message: 'Bad request'
  //       });
  //   });
}

const register = (req, res) => {
  try {
    res.json({
      status: 'OK'
    });
    // shipSvc.uploadIcon(req.body)
    // .then((result) => {
    //   res
    //     .status(200)
    //     .json(result);
    // }).catch((err) => {
    //   if (err instanceof ex.ShipNotFoundException) {
    //     res
    //       .status(400)
    //       .json({
    //         message: err.message,
    //         name: err.name,
    //       });
    //   } else {
    //     console.log(err);
    //     res
    //       .status(400)
    //       .json({
    //         message: 'Bad request'
    //       });
    //   }
    // });
  } catch (err) {
    // if (err instanceof ex.ValidationException) {
    //   res
    //     .status(400)
    //     .json({
    //       message: err.message,
    //       name: err.name,
    //     });
    // } else {
    //   res
    //     .status(500)
    //     .json({
    //       name: 'SERVER_ERROR',
    //     });
    // }
  }
}

module.exports = {
  listScholars,
  register,
};
