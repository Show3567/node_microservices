import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import logger, { loggerErr } from "../logger.config";

export const dtoCheck = (
	DtoClass: any,
	callback:
		| ((err: ValidationError[]) => ValidationError[])
		| null = null
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const dto = plainToInstance(DtoClass, req.body);
		const errors = await validate(dto);
		if (errors.length > 0) {
			if (callback) {
				const err = callback(errors);
				logger.error(loggerErr("dtoCheck", 400, "", err));
				res.status(400).json(err);
			} else {
				logger.error(loggerErr("dtoCheck", 400, "", errors));
				res.status(400).json(errors);
			}
		}
		next();
	};
};
