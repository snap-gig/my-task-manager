import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { Task, TaskStatus } from "../entity/Task";
import logger from "../utils/logger";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await this.taskService.createTask(req.body);
      res.status(201).json({
        status: "success",
        data: task,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Board not found") {
        res.status(404).json({
          status: "error",
          message: "Board not found",
        });
        return;
      }
      logger.error("Error in create task controller", { error });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

  getTasksByBoard = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.taskService.getTasksByBoardId(
        req.params.boardId
      );
      res.json({
        status: "success",
        data: tasks,
      });
    } catch (error) {
      logger.error("Error in get tasks by board controller", {
        boardId: req.params.boardId,
        error,
      });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await this.taskService.getTaskById(req.params.id);
      if (!task) {
        res.status(404).json({
          status: "error",
          message: "Task not found",
        });
        return;
      }
      res.json({
        status: "success",
        data: task,
      });
    } catch (error) {
      logger.error("Error in get task controller", {
        taskId: req.params.id,
        error,
      });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await this.taskService.updateTask(req.params.id, req.body);
      if (!task) {
        res.status(404).json({
          status: "error",
          message: "Task not found",
        });
        return;
      }
      res.json({
        status: "success",
        data: task,
      });
    } catch (error) {
      logger.error("Error in update task controller", {
        taskId: req.params.id,
        error,
      });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

  updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      if (!Object.values(TaskStatus).includes(status)) {
        res.status(400).json({
          status: "error",
          message: "Invalid status value",
        });
        return;
      }

      const task = await this.taskService.updateTaskStatus(
        req.params.id,
        status
      );
      if (!task) {
        res.status(404).json({
          status: "error",
          message: "Task not found",
        });
        return;
      }
      res.json({
        status: "success",
        data: task,
      });
    } catch (error) {
      logger.error("Error in update task status controller", {
        taskId: req.params.id,
        error,
      });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

  deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      logger.error("Error in delete task controller", {
        taskId: req.params.id,
        error,
      });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };
}
