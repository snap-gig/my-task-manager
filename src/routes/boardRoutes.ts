import { Router, RequestHandler } from "express";
import { BoardController } from "../controllers/boardController";
import { validateRequest } from "../middleware/validation";
import { Board } from "../entity/Board";
import logger from "../utils/logger";

const router = Router();
const boardController = new BoardController();

// Create a new board
const createBoardHandler: RequestHandler = async (req, res) => {
  try {
    await boardController.createBoard(req, res);
  } catch (error) {
    logger.error("Unhandled error in create board route", { error });
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get all boards
const getAllBoardsHandler: RequestHandler = async (req, res) => {
  try {
    await boardController.getAllBoards(req, res);
  } catch (error) {
    logger.error("Unhandled error in get all boards route", { error });
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Get a single board
const getBoardHandler: RequestHandler = async (req, res) => {
  try {
    await boardController.getBoardById(req, res);
  } catch (error) {
    logger.error("Unhandled error in get board route", { error });
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Update a board
const updateBoardHandler: RequestHandler = async (req, res) => {
  try {
    await boardController.updateBoard(req, res);
  } catch (error) {
    logger.error("Unhandled error in update board route", { error });
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// Delete a board
const deleteBoardHandler: RequestHandler = async (req, res) => {
  try {
    await boardController.deleteBoard(req, res);
  } catch (error) {
    logger.error("Unhandled error in delete board route", { error });
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

router.post("/", validateRequest(Board), createBoardHandler);
router.get("/", getAllBoardsHandler);
router.get("/:id", getBoardHandler);
router.put("/:id", validateRequest(Board), updateBoardHandler);
router.delete("/:id", deleteBoardHandler);

export default router;
