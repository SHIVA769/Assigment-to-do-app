import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All task routes should be protected
router.use(protect);

// @route GET /api/tasks
// @desc Get user's tasks (can filter by completed: /api/tasks?completed=true)
router.get("/", async (req, res) => {
  try {
    const { completed } = req.query;
    let query = { user: req.user.id };

    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks." });
  }
});

// @route POST /api/tasks
// @desc Add a new task
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Task title is required." });
    }

    const task = await Task.create({
      title,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task." });
  }
});

// @route PUT /api/tasks/:id
// @desc Update a task (edit title or toggle completed)
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Ensure the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized." });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task." });
  }
});

// @route DELETE /api/tasks/:id
// @desc Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Ensure the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized." });
    }

    await task.deleteOne();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task." });
  }
});

export default router;
