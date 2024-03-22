import Redis from "ioredis";

export const connectRedis = () => {
	const redisClient = new Redis({
		host: "localhost", // Your Redis host
		port: 6379, // Your Redis port
	});

	// Verify Redis connection
	redisClient.on("connect", () => console.log("Connected to Redis!"));
	redisClient.on("error", (err) =>
		console.error("Redis connection error:", err)
	);

	return redisClient;
};
