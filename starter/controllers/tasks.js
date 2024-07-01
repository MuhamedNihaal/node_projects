const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }

}

const getSingleTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `No Task With ID: ${taskID}` })
        }


        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true //options
        })

        if (!task) {
            return res.status(404).json({ msg: `No Task With ID: ${taskID}` })
        }

        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findByIdAndDelete({ _id: taskID })

        if (!task) {
            return res.status(404).json({ msg: `No Task With ID: ${taskID}` })
        }

        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}