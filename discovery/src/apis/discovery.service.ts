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
		let obj: ServiceInstanceDB;

		const cachedData = await redisClient.get(key);
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

	const checkAllData: RequestHandler = async (req, res) => {};

	return { setServerAdd, getServerAdd };
};
