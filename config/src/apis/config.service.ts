import { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import { fetchConfigFromGitHub } from "./getdata";
import logger, { loggerInfo } from "../core/logger.config";

const getConfigData = () => {
	const rawData = fs.readFileSync(
		path.join(__dirname, "../store", "config.json"),
		"utf8"
	);
	return JSON.parse(rawData);
};

export const getConfig: RequestHandler = async (req, res) => {
	const filePath = path.join(__dirname, "../store", "config.json");
	// {data: [...]};
	const configs = [...req.body.data];
	// const configFromGit = await fetchConfigFromGitHub("config.json");

	// console.log("data: ", JSON.parse(configFromGit));

	if (fs.existsSync(path.dirname(filePath))) {
		const data = getConfigData();
		// const data = JSON.parse(configFromGit);
		const result = configs.reduce((acc, cur) => {
			return {
				...acc,
				[cur]: data[cur],
			};
		}, {});

		logger.info(loggerInfo("getConfig", 201, result));
		res.status(201).json(result);
	} else {
		res.status(404).json({ message: "Cannot found config file" });
	}
};

export const getKey: RequestHandler = async (req, res) => {
	const { key } = req.query; // key: 'priv' | 'pub';

	const keyFile = await fetchConfigFromGitHub(`id_rsa_${key}.pem`);
	res.send(keyFile);
};
