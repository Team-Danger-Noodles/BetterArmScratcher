const User = require('../models/userModel');

const userController = {};

// add a user
userController.addUser = (req, res, next) => {
  const { name } = req.body;

  User.create({
    name,
  })
    .then((data) => {
      res.locals.newUser = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.addUser: Error ${err}`,
        message: {
          err: 'Error occurred in userController.addUser. Check server logs',
        },
        status: 400,
      });
    });
};

// update a user
userController.updateUser = (req, res, next) => {
  const {name} = req.params;
  const updateUser = req.body;

  User.findOneAndUpdate(
    {name: name},
    {name: updateUser}
  ).exec()
    .then(data => {
      if (!data) {
        return next({
          log: `userController.updateUser: ${name} was not found in the database`,
          message: {
            err: 'Student not found'
          },
          status: 404,
        });
      }
      res.locals.user = data;
      return next();
    })
    .catch(err => {
      return next({
        log: `userController.updateUser: ERROR: ${err}`,
        messages: {
          err: 'Error occurred in userController.updateUser. Check server logs'
        },
        status: 400,
      });
    });
};

// delete a user
userController.removeUser = (req, res, next) => {
  console.log('Hitting userController.removeUser');
  const { userId } = req.query;
  User.deleteOne( {_id: userId} ).exec()
    .then(data => {
      if (!data) {
        return next({
          log: `userController.removeUser: ${userId} was not found in the database`,
          message: {
            err: 'User not found'
          },
          status: 404,
        });
      } else {
        res.locals.deletedUser = data;
        return next();
      }
    })
    .catch(err => {
      return next({
        log: `userController.removeUser: Error ${err}`,
        message: {
          err: 'Error occurred in userController.removeUser. Check server logs'
        },
        status: 400,
      });
    });
};

userController.getUsersById = (req, res, next) => {
  const arr = res.locals.userArray;

  User.find({ _id: { $in: arr } })
    .then((data) => {
      res.locals.users = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error occurred while getting users from project: ' + err,
        message: { err: 'error occurred while getting users from project: ' + err },
      });
    });
};




module.exports = userController;
