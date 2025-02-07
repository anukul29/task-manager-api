const Task = require('../models/task.model');

// Create Task
exports.createTask = async (req, res) => {
    // console.log("HIIIIII")
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.userId; // from JWT

    const task = new Task({
      user: userId,
      title,
      description,
      dueDate
    });

    console.log(task);

    await task.save();
    return res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get All Tasks (with optional filters)
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status, dueBefore, dueAfter } = req.query;

    let query = { user: userId };

    if (status) {
      query.status = status;
    }
    if (dueBefore) {
      query.dueDate = { ...query.dueDate, $lte: new Date(dueBefore) };
    }
    if (dueAfter) {
      query.dueDate = { ...query.dueDate, $gte: new Date(dueAfter) };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get Single Task
exports.getTaskById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, dueDate, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    return res.status(200).json({ message: 'Task updated', task: updatedTask });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Mark Task as Complete
exports.markComplete = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { status: 'completed' },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    return res.status(200).json({ message: 'Task marked as completed', task: updatedTask });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    return res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
