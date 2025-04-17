import { AppDataSource } from "../config/db";
import { Board } from "../entity/Board";
import logger from "../utils/logger";

export class BoardService {
  private boardRepository = AppDataSource.getRepository(Board);

  async createBoard(boardData: Partial<Board>): Promise<Board> {
    try {
      const board = this.boardRepository.create(boardData);
      const savedBoard = await this.boardRepository.save(board);
      logger.info("Board created successfully", { boardId: savedBoard.id });
      return savedBoard;
    } catch (error) {
      logger.error("Error creating board", { error });
      throw error;
    }
  }

  async getBoardById(id: string): Promise<Board | null> {
    try {
      const board = await this.boardRepository.findOne({
        where: { id },
        relations: ["tasks"],
      });
      return board;
    } catch (error) {
      logger.error("Error fetching board", { boardId: id, error });
      throw error;
    }
  }

  async getAllBoards(): Promise<Board[]> {
    try {
      const boards = await this.boardRepository.find({
        relations: ["tasks"],
      });
      return boards;
    } catch (error) {
      logger.error("Error fetching all boards", { error });
      throw error;
    }
  }

  async updateBoard(
    id: string,
    boardData: Partial<Board>
  ): Promise<Board | null> {
    try {
      await this.boardRepository.update(id, boardData);
      const updatedBoard = await this.getBoardById(id);
      logger.info("Board updated successfully", { boardId: id });
      return updatedBoard;
    } catch (error) {
      logger.error("Error updating board", { boardId: id, error });
      throw error;
    }
  }

  async deleteBoard(id: string): Promise<void> {
    try {
      await this.boardRepository.delete(id);
      logger.info("Board deleted successfully", { boardId: id });
    } catch (error) {
      logger.error("Error deleting board", { boardId: id, error });
      throw error;
    }
  }
}
