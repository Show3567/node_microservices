import { RequestHandler } from "express";
import fs from "fs";
import path from "path";

const getConfigData = () => {
	const rawData = fs.readFileSync(
		path.join(__dirname, "../store", "config.json"),
		"utf8"
	);
	return JSON.parse(rawData);
};

export const getConfig: RequestHandler = (req, res) => {
	const filePath = path.join(__dirname, "../store", "config.json");
	// {data: [...]};
	const configs = [...req.body.data];

	if (fs.existsSync(path.dirname(filePath))) {
		const data = getConfigData();
		const result = configs.reduce((acc, cur) => {
			return {
				...acc,
				[cur]: data[cur],
			};
		}, {});
		res.status(201).json(result);
	} else {
		res.status(404).json({ message: "Cannot found config file" });
	}
};

export const getKey: RequestHandler = (req, res) => {};
