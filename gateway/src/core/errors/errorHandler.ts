import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";
import logger, { loggerErr } from "../logger.config";

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof ApiError) {
		logger.error(
			loggerErr("errorHandler", err.statusCode, err.message, err)
		);
		res.status(err.statusCode).json({ error: err.message });
	} else {
		logger.error(
			loggerErr("errorHandler", 500, "Internal Server Error", err)
		);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
