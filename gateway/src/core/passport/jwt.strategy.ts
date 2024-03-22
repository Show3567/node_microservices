import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptionsWithoutRequest,
} from "passport-jwt";
import "../env.config";

import { Algorithm } from "jsonwebtoken";
import { selectSecret } from "../../config/selectSecret";

export const useJwtStrategy = (passport: any) => {
	const { secret, algorithm } = selectSecret("pub");

	const options_exp: StrategyOptionsWithoutRequest = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: secret as string | Buffer,
		algorithms: [algorithm as Algorithm],
		ignoreExpiration: false,
	};

	const strategyCreator = (
		options: StrategyOptionsWithoutRequest
	) => {
		return new JwtStrategy(options, async (payload, done) => {
			if (payload) {
				const user = { ...payload };
				return done(null, user);
			} else {
				return done(null, false, { message: "Invalid token." });
			}
		});
	};
	passport.use("jwt", strategyCreator(options_exp));
};
