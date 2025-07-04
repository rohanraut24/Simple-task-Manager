import Task from '../models/task.model.js';

async function getAllTasks(req, res) {
    const userId = req.params.userId;
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

export { getAllTasks, insertTask };