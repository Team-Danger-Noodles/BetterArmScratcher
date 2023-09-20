const Project = require('../models/projectModel.js'); 
const mongoose = require('mongoose');

const projectController = {};

projectController.getProject = (req, res, next) => {
  console.log(req.query);
  // { name: 't' }
  const { name } = req.query;
  Project.findOne({name: name})
    .then((data) => {
      res.locals.project = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error occurred in creating project: ' + err,
        message: { err: 'error occurred in creating project: ' + err },
      });
    });
};

projectController.addProject = (req, res, next) => {
  const { name } = req.body;
  Project.create({
    name,
    users: [],
    categories: []
  })
    .then((data) => {
      res.locals.project = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error occurred in creating project: ' + err,
        message: { err: 'error occurred in creating project: ' + err },
      });
    });
};



projectController.addUser = (req, res, next) => {
  const { projectName } = req.body;
  const userId = res.locals.newUser._id;
  Project.findOneAndUpdate(
    { name: projectName}, 
    { $push: { users: userId }})
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error occurred in adding user to project ' + err,
        message: { err: 'error occurred in adding user to project: ' + err },
      });
    });
};

projectController.addCategory = async (req, res, next) => {
  const { projectName, categoryId } = req.body;
  const catId = res.locals.category._id;
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { name: projectName },
      { $push: { categories: catId } }
    );
    res.locals.category = updatedProject;
    return next();
  } catch (err) {
    return next({
      log: 'error occurred while adding category to project: ' + err,
      message: { err: 'error occurred while adding category to project: ' + err },
    });
  }
};

projectController.getUsers = (req, res, next) => {
  const { projectName } = req.query;
  Project.findOne({name: projectName})
    .then((project) => {
      console.log(project);
      res.locals.userArray = project.users;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error occurred while getting users from project: ' + err,
        message: { err: 'error occurred while getting users from project: ' + err },
      });
    });
};

projectController.removeUser = (req, res, next) => {
  console.log('Hitting projectController.removeUser');
  const { userId, projectName } = req.query;
  
  console.log('USERID: ', userId);
  console.log('projname: ', projectName);

  // const id = mongoose.Types.ObjectId(userId);
  // console.log('BASE ID:', userId, '\n CONSTRUCTED ID:', id);
  Project.findOneAndUpdate(
    {name: projectName},
    {$pull: {users: userId}},
    {new: true}
  )
    .then((data) => {
      res.locals.removedUser = data;
      console.log(data);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error occurred while getting users from project: ' + err,
        message: { err: 'error occurred while getting users from project: ' + err },
      });
    });
};
// {
//   _id: ObjectId("650b5f2892eeb74c965abccc"),
//   categoryId: '650b5df94fae277662875444',
//   name: 'newCategory',
//   tasks: [],
//   __v: 0
// }


module.exports = projectController;