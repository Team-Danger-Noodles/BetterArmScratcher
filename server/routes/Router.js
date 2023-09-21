const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const categoryController = require('../controllers/categoryController');
const projectController = require('../controllers/projectController');

//CATEGORY CONTROLLERS

// /get route for categories --> in the "projects" section @ bottom

router.post('/category', categoryController.addCategory, projectController.addCategory, (req, res) => {
  console.log('finished creating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.put('/category', categoryController.addTaskToCategory, (req, res) => {
  console.log('finished updating category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.delete('/category', categoryController.removeCategory, (req, res) => {
  console.log('finished removing category', res.locals.category);
  res.status(200).json(res.locals.category);
});

router.post('/categorySwap', categoryController.popSource, categoryController.pushDestination,  (req, res) => {
  console.log('finished swapping tasks between category', res.locals.pushData);
  res.status(200).json(res.locals.pushData);
});

// USER CONTROLLERS
router.post('/signup', userController.addNewUser,  projectController.addUser, (req, res) => {
  console.log('added user', res.locals.newUser);
  res.status(200).json(res.locals.newUser);
});
router.post('/google', userController.addNewUser, projectController.addUser, (req, res) => {
  console.log('added user', res.locals.newUser);
  res.status(200).json(res.locals.newUser);
});
router.post('/login', userController.login, (req, res) => {
  res.status(200).json(res.locals.userDoc);
});

////////////
router.delete('/user', userController.removeUser, projectController.removeUser, (req, res) => {
  console.log('removed user', res.locals.deletedUser);
  res.status(200).json(res.locals.deletedUser);
});
///////////////


// TASK CONTROLLERS
router.get('/task', taskController.getTask, (req, res) => {
  console.log('finished getting tasks', res.locals.task);
  res.status(200).json(res.locals.task);
});

router.post('/task', taskController.addTask, (req, res) => {
  console.log('finished creating task', res.locals.task);
  res.status(200).json(res.locals.task);
});

router.put('/task', taskController.editTask, (req, res) => {
  console.log('finished updating task', res.locals.task);
  res.status(200).json(res.locals.task);
});

router.delete('/task', taskController.removeTask, (req, res) => {
  console.log('finished removing task', res.locals.task);
  res.status(200).json(res.locals.task);
});

//projects

router.post('/project', projectController.addProject, (req, res) => {
  console.log('finished adding project');
  res.status(201).json(res.locals.project);
});


router.get('/project', projectController.getProject, (req, res) => {
  console.log('finished getting project');
  res.status(200).json(res.locals.project);
});


router.get('/user', projectController.getUsers, userController.getUsersById, (req, res) => {
  console.log('finished getting users off of project');
  res.status(200).json(res.locals.users);
});


router.get('/category', projectController.getCategories, categoryController.getCategoriesById, categoryController.convert, taskController.convert, (req, res) => {
  console.log('finished getting categoriies', res.locals.categoriesArray);
  res.status(200).json(res.locals.stateCache);
});


module.exports = router;
