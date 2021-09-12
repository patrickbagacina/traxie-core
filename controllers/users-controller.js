// const ship = require('../models/ship');
const accountSvc = require('../services/user-service');
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
      console.log(`Error >> `, err);
    });
}

module.exports = {
  listScholars,
  register,
};
