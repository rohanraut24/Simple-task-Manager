import Task from '../models/task.model.js'

async function getAllTasks(req, res) {
    const userId = req.query.userId;
    try {
        const allTasks = await Task.find({ user: userId });
        console.log(allTasks);
        res.status(200).json({ success: true, msg: "User Tasks Fetched Successfully", tasks: allTasks });
    } catch (err) {
        res.status(500).json({ success: false, msg: "Error fetching the user tasks" });
    }
}

async function insertTask(req, res) {
    const { title, content, userId } = req.body;
    if (!title || !content) {
        return res.status(400).json({ success: false, msg: 'title and content cannot be empty' });
    }
    if (!userId) {
        return res.status(400).json({ success: false, msg: 'user id cannot be empty' });
    }

    try {
        const task = await Task.create({ title, content, user: userId });
        console.log("Task inserted successfully");
        return res.json({ success: true, msg: "task added successfully", task });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "error while adding task", err });
    }
}

async function deleteTask(req, res) {
    const taskId = req.query.taskId;
    if (!taskId) {
        return res.status(400).json({ success: false, msg: "task id required" });
    }
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: taskId });
        console.log("task deleted");
        res.status(200).json({ success: true, msg: "task deleted success", deletedTask });
    } catch (err) {
        res.json({ success: false, msg: "Error while deleting task", err });
    }
}

async function updateTask(req, res) {
    const taskId = req.query.taskId;
    const newContent  = req.query.newContent;
    if (!taskId) {
        return res.status(400).json({ success: false, msg: "task id required" });
    }
    if (!newContent) {
        return res.status(400).json({ success: false, msg: "new content required" });
    }

    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, { $set: { content: newContent } }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ success: false, msg: "Task not found" });
        }
        console.log("Task Updated Successfully");
        res.status(200).json({ success: true, updatedTask });
    } catch (err) {
        res.status(500).json({ success: false, msg: "Error while updating task", err });
    }
}

export { getAllTasks, insertTask, deleteTask,updateTask};