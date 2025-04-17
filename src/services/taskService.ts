import { AppDataSource } from "../config/db";
import { Task, TaskStatus } from "../entity/Task";
import { Board } from "../entity/Board";
import logger from "../utils/logger";

export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);
  private boardRepository = AppDataSource.getRepository(Board);

  async createTask(taskData: Partial<Task>): Promise<Task> {
    try {
      if (!taskData.boardId) {
        throw new Error("Board ID is required");
      }
      // Verify board exists
      const board = await this.boardRepository.findOne({
        where: { id: taskData.boardId },
      });

      if (!board) {
        throw new Error("Board not found");
      }

      // Ensure boardId is set
      const task = this.taskRepository.create({
        ...taskData,
        boardId: taskData.boardId,
      });

      const savedTask = await this.taskRepository.save(task);
      logger.info("Task created successfully", { taskId: savedTask.id });
      return savedTask;
    } catch (error) {
      logger.error("Error creating task", { error });
      throw error;
    }
  }

  async getTaskById(id: string): Promise<Task | null> {
    try {
      const task = await this.taskRepository.findOne({
        where: { id },
        relations: ["board"],
      });
      return task;
    } catch (error) {
      logger.error("Error fetching task", { taskId: id, error });
      throw error;
    }
  }

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find({
        where: { boardId },
        relations: ["board"],
      });
      return tasks;
    } catch (error) {
      logger.error("Error fetching tasks for board", { boardId, error });
      throw error;
    }
  }

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task | null> {
    try {
      await this.taskRepository.update(id, taskData);
      const updatedTask = await this.getTaskById(id);
      logger.info("Task updated successfully", { taskId: id });
      return updatedTask;
    } catch (error) {
      logger.error("Error updating task", { taskId: id, error });
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.taskRepository.delete(id);
      logger.info("Task deleted successfully", { taskId: id });
    } catch (error) {
      logger.error("Error deleting task", { taskId: id, error });
      throw error;
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task | null> {
    try {
      await this.taskRepository.update(id, { status });
      const updatedTask = await this.getTaskById(id);
      logger.info("Task status updated successfully", { taskId: id, status });
      return updatedTask;
    } catch (error) {
      logger.error("Error updating task status", { taskId: id, error });
      throw error;
    }
  }

  async getTasksByBoardAndStatus(
    boardId: string,
    status: TaskStatus
  ): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find({
        where: {
          boardId,
          status,
        },
        relations: ["board"],
      });
      return tasks;
    } catch (error) {
      logger.error("Error fetching tasks by board and status", {
        boardId,
        status,
        error,
      });
      throw error;
    }
  }
}
