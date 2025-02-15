import { RequestHandler } from "express";
import { Redis } from "ioredis";
import { ServiceInstanceDB } from "./dto/setServer.dto";
import logger, { loggerErr, loggerInfo } from "../core/logger.config";

const addAdd = (orgarr: string[], address: string) => {
	return orgarr.includes(address) ? orgarr : [...orgarr, address];
};

export const discoveryService = (redisClient: Redis) => {
	const setServerAdd: RequestHandler = async (req, res) => {
		const {
			key,
			service: { endpoint, healthStatus, ttl },
		} = req.body;
		const cachedData = await redisClient.get(key);
		let obj: ServiceInstanceDB;

		if (cachedData) {
			const data: ServiceInstanceDB = JSON.parse(cachedData);
			obj = {
				endpoints: addAdd(data.endpoints, endpoint),
				healthStatus,
				ttl,
				timestamps: {
					...data.timestamps,
					updated: Date.now().toString(),
				},
			};
		} else {
			obj = {
				endpoints: [endpoint],
				healthStatus,
				ttl,
				timestamps: {
					created: Date.now().toString(),
					updated: Date.now().toString(),
				},
			};
		}
		await redisClient.set(key, JSON.stringify(obj), "EX", ttl);

		logger.info(loggerInfo(`setServerAdd`, 201, { [key]: obj }));
		res.status(201).json({ [key]: obj });
	};

	const getServerAdd: RequestHandler = async (req, res) => {
		const key = req.params.key;
		const cachedData = await redisClient.get(key);
		if (cachedData) {
			const resultObj = JSON.parse(cachedData);
			logger.info(
				loggerInfo(`getServerAdd`, 201, { [key]: resultObj })
			);
			res.status(200).json({ [key]: resultObj });
		} else {
			logger.info(
				loggerInfo(`getServerAdd`, 208, {
					message: "Cannot found this Server!",
				})
			);
			res.status(208).json({ message: "Cannot found this Server!" });
		}
	};

	const deleteKey: RequestHandler = async (req, res) => {
		const key = req.params.key;
		try {
			const result = await redisClient.del(key);
			if (result === 1) {
				res.json(`Key ${key} deleted successfully.`);
			} else {
				res.json(`Key ${key} does not exist.`);
			}
		} catch (error) {
			res.json({ message: `Error deleting key ${key}:`, err: error });
		}
	};

	const checkAllData: RequestHandler = async (req, res) => {
		try {
			const keys = await redisClient.keys("*"); // Get all keys in Redis
			const data = await Promise.all(
				keys.map((key) =>
					redisClient.get(key).then((value) => ({ key, value }))
				)
			);
			logger.info(loggerInfo(`checkAllData`, 201, data));
			res.status(200).json(data);
		} catch (error) {
			console.error("Error fetching data from Redis:", error);
			logger.error(
				loggerErr(
					`checkAllData`,
					500,
					"Error fetching data from Redis"
				)
			);
			res.status(500).send("Error fetching data from Redis");
		}
	};

	return { setServerAdd, getServerAdd, deleteKey, checkAllData };
};
