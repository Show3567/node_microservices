import { RequestHandler } from "express";
import { Redis } from "ioredis";
import { ServiceInstanceDB } from "./dto/setServer.dto";

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
			console.log("~~~~~~~~~~~~", data);
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

		res.status(201).json({ [key]: obj });
	};

	const getServerAdd: RequestHandler = async (req, res) => {
		const key = req.params.key;
		const cachedData = await redisClient.get(key);
		if (cachedData) {
			res.status(200).json({
				[key]: JSON.parse(cachedData),
			});
		} else {
			res.status(404).json({ message: "Cannot found this Server!" });
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

	const checkAllData: RequestHandler = async (req, res) => {};

	return { setServerAdd, getServerAdd, deleteKey };
};
