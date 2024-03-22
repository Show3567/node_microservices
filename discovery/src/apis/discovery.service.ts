import { RequestHandler } from "express";
import { Redis } from "ioredis";

export const discoveryService = (redisClient: Redis) => {
	const setServerAdd: RequestHandler = async (req, res) => {
		const { key, address } = req.body;
		await redisClient.set(
			key,
			JSON.stringify(address),
			"EX",
			3600 * 24
		);
		res.status(201).json({ [key]: address });
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

	return { setServerAdd, getServerAdd };
};
