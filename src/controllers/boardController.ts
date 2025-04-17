import { Request, Response } from "express";
import { BoardService } from "../services/boardService";
import { Board } from "../entity/Board";
import logger from "../utils/logger";

export class BoardController {
  private boardService: BoardService;

  constructor() {
    this.boardService = new BoardService();
  }

  createBoard = async (req: Request, res: Response): Promise<void> => {
    try {
      const board = await this.boardService.createBoard(req.body);
      res.status(201).json({
        status: "success",
        data: board,
      });
    } catch (error) {
      logger.error("Error in create board controller", { error });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

  getAllBoards = async (req: Request, res: Response): Promise<void> => {
    try {
      const boards = await this.boardService.getAllBoards();
      res.json({
        status: "success",
        data: boards,
      });
    } catch (error) {
      logger.error("Error in get all boards controller", { error });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

  getBoardById = async (req: Request, res: Response): Promise<void> => {
    try {
      const board = await this.boardService.getBoardById(req.params.id);
      if (!board) {
        res.status(404).json({
          status: "error",
          message: "Board not found",
        });
        return;
      }
      res.json({
        status: "success",
        data: board,
      });
    } catch (error) {
      logger.error("Error in get board controller", {
        boardId: req.params.id,
        error,
      });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

  updateBoard = async (req: Request, res: Response): Promise<void> => {
    try {
      const board = await this.boardService.updateBoard(
        req.params.id,
        req.body
      );
      if (!board) {
        res.status(404).json({
          status: "error",
          message: "Board not found",
        });
        return;
      }
      res.json({
        status: "success",
        data: board,
      });
    } catch (error) {
      logger.error("Error in update board controller", {
        boardId: req.params.id,
        error,
      });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

  deleteBoard = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.boardService.deleteBoard(req.params.id);
      res.status(204).send();
    } catch (error) {
      logger.error("Error in delete board controller", {
        boardId: req.params.id,
        error,
      });
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };
}
