const Task = require("../models/TaskModel");
const moment = require("moment");

// @desc Get Tasks
// @route GET /api/Tasks
// @access public
const getTasks = async (req, res, next) => {
  try {
    const Tasks = await Task.find();
    const TasksList = Tasks.map((Task) => {
      return {
        id: Task._id,
        name: Task.name,
        startDate: moment(Task.startDate).utc().format("YYYY-MM-DD"),
        endDate:  moment(Task.endDate).utc().format("YYYY-MM-DD"),
        project: Task.project,
        description : Task.description,
        assigneees :Task.assignees,
        priority :Task.priority
       
      };
    });
    res.status(200).json(TasksList);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// @desc Register new Task
// @route POST /api/Tasks
// @access public
const registerTask = async (req, res, next) => {
  const { name, startDate, endDate, project ,assignees ,description ,priority} = req.body;
  try {
    if (!name) {
      res.status(400);
      throw new Error("Please add a name");
    } else if (!startDate) {
      res.status(400);
      throw new Error("Please add a start date");
    } else if (!endDate) {
      res.status(400);
      throw new Error("Please add an end date");
    }else if(!assignees){
      res.status(400);
      throw new Error("Please add an assignee");
    }else if (!project) {
      res.status(400);
    }else if(!description){
      throw new Error("Please add a descrption");
    }else if (!priority){
      throw new Error("Please choose the priority");
    }

    const task = await Task.create({
    name,
    startDate,
    endDate,
    project,
    description,
    assignees,
    priority
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// @desc Update Task
// @route PUT /api/Tasks/:id
// @access public
const updateTask = async (req, res, next) => {
  try {
    const Task = await Task.findById(req.params.id);

    if (!Task) {
      res.status(400);
      throw new Error("Task not found");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: `Task - ${updatedTask.name} updated successfully`,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// @desc Delete Task
// @route DELETE /api/Tasks/:id
// @access public
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(400);
      throw new Error("Task not found");
    }
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: `Task with id - ${req.params.id} deleted`,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  getTasks,
  registerTask,
  updateTask,
  deleteTask
};
