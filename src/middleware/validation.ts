import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import logger from "../utils/logger";

export const validateRequest = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Replace plainToClass with plainToInstance
      const dto = plainToInstance(dtoClass, req.body);

      // Different validation options for creation vs update
      const isUpdate = req.method === "PUT" || req.method === "PATCH";
      const validationOptions = {
        skipMissingProperties: isUpdate, // Skip validation for undefined properties only during updates
        whitelist: true, // Strip properties that don't have any decorators
        forbidNonWhitelisted: false, // Allow non-whitelisted properties
      };

      const errors = await validate(dto, validationOptions);

      if (errors.length > 0) {
        const errorMessages = errors.map((error) => {
          return {
            property: error.property,
            constraints: error.constraints,
          };
        });

        logger.error("Validation failed", { errors: errorMessages });
        res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: errorMessages,
        });
        return;
      }

      req.body = dto;
      next();
    } catch (error) {
      logger.error("Validation middleware error", { error });
      res.status(500).json({
        status: "error",
        message: "Internal server error during validation",
      });
      return;
    }
  };
};
