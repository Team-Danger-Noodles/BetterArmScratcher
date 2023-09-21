const Category = require('../models/categoryModel');


const categoryController = {};


categoryController.getCategory = async (req, res, next) => {
  console.log('HEHEHEHEH HOOOHOOOO simon L wuz here HAHAHAHAHAAAA');
  try{
    const categories = await Category.find({});
    res.locals.category = categories;
    return next();
  } catch (err) {
    return next({
      log: 'error occurred in creating category: ' + err,
      message: { err: 'error occurred in creating category: ' + err },
    });
  }
  
};


categoryController.addCategory = async (req, res, next) => {
  const { categoryId, name } = req.body;

  try {
    const existingCategory = await Category.findOne({ categoryId });
    if (existingCategory) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    const newCategory = await Category.create({ categoryId, name });
    res.locals.category = newCategory;
    return next();
  } catch (err) {
    return next({
      log: 'error occurred in creating category: ' + err,
      message: { err: 'error occurred in creating category: ' + err },
    });
  }
};


categoryController.removeCategory = async (req, res, next) => {
  const {removeCat} = req.body;

  try {
    const deleted = await Category.findOneAndDelete({category: removeCat});
    if (deleted === null) {
      res.locals.category = 'Nothing was Deleted, could not find category to delete';
      return next();
    } else{
      res.locals.category = deleted;
      return next();
    }
  } catch (err) {
    return next({
      log: 'error occured in delete',
      message: {err: 'error occured in delete: ' + err}  
    });
  }


};


categoryController.addTaskToCategory = async (req, res, next) => {
  const {categoryId, newTask} = req.body;

  try {
    const update = await Category.findOneAndUpdate(
      { categoryId },
      { $push: {tasks: newTask._id}});
    res.locals.category = update;
    return next();
  } catch (err) {
    return next({
      log: 'error occured in update',
      message: {err: 'error occured in update: ' + err}  
    });
  }
};

categoryController.getCategoriesById = (req, res, next) => {
  const arr = res.locals.categoriesArray;
  
  Category.find({ _id: { $in: arr } })
    .then((data) => {
      res.locals.categories = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error occurred while getting categories from project: ' + err,
        message: { err: 'error occurred while getting categories from project: ' + err },
      });
    });
};


categoryController.pushDestination = (req, res, next) => {
  const { destinationId, taskId } = req.body;
  
  Category.findOneAndUpdate(
    {_id: destinationId},
    {$push: { tasks: taskId }}
  )
    .then((data) => {
      res.locals.pushData = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error occurred while adding task to category: ' + err,
        message: { err: 'error occurred while adding task to category: ' + err },
      });
    });
};

//asdasdasd

  
  
categoryController.popSource = (req, res, next) => {
  const { sourceId, taskId } = req.body;
  
  Category.findOneAndUpdate(
    {_id: sourceId},
    {$pull: {tasks: taskId}}
  )
    .then(data => {
      res.locals.popData = data;
      return next();
    })
    .catch(err => {
      return next({log:'error removing task from category on drag / drop ' + err, message: { err: 'error occurred while adding task to category: ' + err }});
    });
};  



categoryController.convert = (req, res, next) => {
  const stateCache = {};
  // res.locals.categories.map((category) => {
  //   return {[category.categoryId]: {name: category.name, items: category.tasks}};
  // });
  res.locals.categories.forEach((category) => {
    stateCache[category.categoryId] = {name: category.name, items: category.tasks};
  });
  res.locals.stateCache = stateCache;
  return next();
  // iterate through what's returned by map --> palce those objects into stateCache w/ their ID
};

module.exports = categoryController;