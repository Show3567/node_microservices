import { Express } from "express";
import passport from "passport";
import { useJwtStrategy } from "./passport/jwt.strategy";
import { DataSource } from "typeorm";

export const authConfig = (
	app: Express,
	appDataSouse: DataSource
) => {
	useJwtStrategy(passport, appDataSouse);
	app.use(passport.initialize());
};
