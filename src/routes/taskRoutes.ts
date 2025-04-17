import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { validateRequest } from '../middleware/validation';
import { Task } from '../entity/Task';

const router = Router();
const taskController = new TaskController();

// Create a new task
router.post('/', validateRequest(Task), taskController.createTask);

// Get all tasks for a board
router.get('/board/:boardId', taskController.getTasksByBoard);

// Get a single task
router.get('/:id', taskController.getTaskById);

// Update a task
router.put('/:id', validateRequest(Task), taskController.updateTask);

// Update task status
router.patch('/:id/status', taskController.updateTaskStatus);

// Delete a task
router.delete('/:id', taskController.deleteTask);


// Get tasks by status for a board
router.get('/board/:boardId/status/:status', taskController.getTasksByBoardAndStatus);


export default router;
