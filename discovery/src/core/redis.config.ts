import Redis from "ioredis";
import "../core/env.config";

export const connectRedis = () => {
	const redisClient = new Redis({
		host: "localhost",
		port: +(process.env.REDIS_PORT as string),
	});

	// Verify Redis connection
	redisClient.on("connect", () => {
		console.log("Connected to Redis!");
	});
	redisClient.on("error", (err) =>
		console.error("Redis connection error:", err)
	);

	return redisClient;
};
