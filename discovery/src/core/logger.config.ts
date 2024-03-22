import * as winston from "winston";
import { LogErr, Loginfo } from "./interfaces/error.interface";

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "app.log" }),
	],
});

export const loggerInfo: Loginfo = (method, status, res = {}) => {
	return { method, status, res };
};
export const loggerErr: LogErr = (
	method,
	status,
	errMsg = "",
	err = {}
) => {
	return { method, status: status, errMsg, err };
};

export default logger;
