import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import "../env.config";

export const AppDataSource = new DataSource({
	type: "mongodb",
	url: process.env.MODB_URL,
	useUnifiedTopology: true,
	useNewUrlParser: true,
	entities: [User],
	synchronize: true,
});

(async () => {
	console.log("connecting db...");
	try {
		await AppDataSource.initialize();
		console.log(`connection successful!`);
	} catch (error) {
		console.error("Error during Data Source initialization", error);
	}
})();
