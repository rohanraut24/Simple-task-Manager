import Task from '../models/task.model.js';
async function getAllTasks(req, res) {
    const userId = req.params.userId;
    try {
        const allTasks = await Task.find({ user: userId });
        console.log(allTasks);
        res.status(200).json({ success: true, msg: "User Tasks Fetches Successfully", tasks: allTasks });
    } catch (err) {
        res.json({ success: false, msg: "Error fetching the user tasks" })
    }
}

async function insertTask(req, res) {
    const { title, content, userId } = req.body;
    if (!title || !content) {
        res.status(400).json({ success: false, msg: 'title and content cannot be empty' });
    }
    if (!userId) {
        res.status(400).json({ success: false, msg: 'user id cannot be empty' });
    }

    try {
        const task = await Task.create({ title, content, user: userId });
        res.json({ success: true, msg: "task added successfully", task });
        console.log("Task inserted successfully");
    } catch (err) {
        res.json({ success: false, msg: "error while adding task", err });
    }
}

export {getAllTasks,insertTask};