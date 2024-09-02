const db = require('../config/db.config');
const List = db.list;
const Task = db.task;
const sequelize = db.sequelize;

exports.createList = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { title, user_id } = req.body;

        if (!title || !user_id) {
            return res.status(400).send({ success: false, message: "Missing required fields." });
        }

        const list = await List.create({
            title,
            user_id,
            done: false,
        }, { transaction });

        await transaction.commit();
        res.status(201).send({ success: true, message: "List created successfully", list });
    } catch (err) {
        await transaction.rollback();
        console.error("Error creating list:", err);
        res.status(500).send({ success: false, message: "Fail! Error -> " + err.message });
    }
};

exports.getList = async (req, res) => {
    try {
        const { id } = req.params;

        const list = await List.findAll({
            where: { user_id: id },
            include: [
                {
                    model: Task,
                }
            ]
        });

        if (!list) {
            return res.status(404).send({ success: false, message: 'List Not Found.' });
        }

        res.status(200).send({ success: true, list });
    } catch (err) {
        console.error("Error fetching list:", err);
        res.status(500).send({ success: false, message: 'Error -> ' + err.message });
    }
};

exports.deleteList = async (req, res) => {
    try {
        const { id } = req.params;

        await Task.destroy({
            where: { list_id: id }
        });

        await List.destroy({
            where: { id }
        });

        res.status(200).send({ success: true, message: "List deleted successfully" });
    } catch (err) {
        console.error("Error deleting list:", err);
        res.status(500).send({ success: false, message: 'Error -> ' + err.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { text, user_id, list_id } = req.body;

        const task = await Task.create({
            text,
            user_id,
            list_id,
            done: false,
        });

        res.status(201).send({ success: true, message: "Task created successfully", task });
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).send({ success: false, message: "Fail! Error -> " + err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).send({ success: true, tasks });
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).send({ success: false, message: 'Error -> ' + err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.destroy({
            where: { id }
        });

        if (!task) {
            return res.status(404).send({ success: false, message: 'Task Not Found.' });
        }

        res.status(200).send({ success: true, message: "Task deleted successfully" });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).send({ success: false, message: 'Error -> ' + err.message });
    }
};
