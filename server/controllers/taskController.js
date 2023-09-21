

const Task = require('../models/taskModel');

const taskController = {};

taskController.getTask = async (req, res, next) => {
  try{
    const tasks = await Task.find({});
    res.locals.task = tasks;
    return next();
  } catch (err) {
    return next({
      log: 'error occurred in getting task: ' + err,
      message: { err: 'error occurred in getting task: ' + err },
    });
  }
  
};

taskController.addTask = async (req, res, next) => {
  const {  
    Task_Name,
    Assignee,
    Due_Date,
    Priority,
    Status,
    Description,
    Category
  } = req.body;

  try {
    const task = await Task.create({Task_Name, Assignee, Due_Date, Priority, Status, Description, Category});
    res.locals.task = task;
    return next();
  } catch (err) {
    return next({
      log: 'failed to create task',
      message: {err: `failed to create task: ${err}`}
    });
  }

};


taskController.removeTask = async (req, res, next) => {
  const { _id } = req.body;
  
  try {
    const deleted = await Task.findOneAndDelete({_id: _id});
    res.locals.task = deleted;
    return next();
  } catch (err) {
    return next({
      log: 'failed to delete task',
      message: {err: `failed to delete task: ${err}`}
    });
  }

};

taskController.editTask = async (req, res, next) => {
  const { _id } = req.body;
  
  try {
    const update = await Task.findOneAndUpdate({_id: _id}, req.body, {new:true});
    res.locals.task = update;
    return next();
  } catch (err) {
    return next({
      log: 'failed to update task',
      message: {err: `failed to update task: ${err}`}
    });
  }


};


taskController.convert = async (req, res, next) => {
  const promises = [];

  for (const [key, value] of Object.entries(res.locals.stateCache)) {
    const taskPromise = Task.find({ _id: { $in: value.items } })
      .then((data) => {
        value.items = data; // Assign the results directly
      })
      .catch((err) => {
        return next({
          log: 'failed to update task',
          message: { err: `failed to update task: ${err}` },
        });
      });

    promises.push(taskPromise);
  }

  try {
    await Promise.all(promises); // Wait for all promises to resolve
    console.log('All Task.find() operations completed successfully');
    console.log('Updated res.locals.stateCache:', res.locals.stateCache);
    return next();
  } catch (error) {
    return next({
      log: 'An error occurred while processing Task.find() operations',
      message: { error: error.message },
    });
  }
};
module.exports = taskController;
