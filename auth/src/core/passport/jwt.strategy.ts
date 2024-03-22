import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { DataSource, Repository } from "typeorm";
import "../env.config";

import { User } from "../entities/user.entity";
import { selectSecret } from "../../config/selectSecret";
import { Algorithm } from "jsonwebtoken";

const { secret, algorithm } = selectSecret("pub");

const options_ignaoreExpire: StrategyOptionsWithoutRequest = {
	// * ~~~~~~~~~~~~~~~~~~ "Authentication": "Bearer <token>"
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret as string | Buffer,
	algorithms: [algorithm as Algorithm],
	ignoreExpiration: true,
};
const options_expire: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret as string | Buffer,
	algorithms: [algorithm as Algorithm],
	ignoreExpiration: false,
};

const strategyCreator = (
	options: StrategyOptionsWithoutRequest,
	AppDataSource: DataSource
) => {
	return new JwtStrategy(options, async (payload, done) => {
		try {
			const userRepository: Repository<User> =
				AppDataSource.getRepository(User);
			const user = await userRepository.findOne({
				where: { email: payload.email },
			});
			if (user) {
				return done(null, user);
			} else {
				return done(null, false, {
					message: "Incorrect username or password.",
				});
			}
		} catch (error) {
			return done(error, false);
		}
	});
};

export const useJwtStrategy = (
	passport: any,
	appDataSouse: DataSource
) => {
	passport.use(
		"jwt_ig_exp",
		strategyCreator(options_ignaoreExpire, appDataSouse)
	);
	passport.use("jwt", strategyCreator(options_expire, appDataSouse));
};
