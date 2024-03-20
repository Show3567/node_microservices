import { Express } from "express";
import passport from "passport";
import { useJwtStrategy } from "./passport/jwt.strategy";

export const authConfig = (app: Express) => {
	useJwtStrategy(passport);
	app.use(passport.initialize());
};
