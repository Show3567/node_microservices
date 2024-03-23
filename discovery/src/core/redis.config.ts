import Redis from "ioredis";

export const connectRedis = () => {
	const redisClient = new Redis({
		host: "localhost",
		port: 6379,
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
