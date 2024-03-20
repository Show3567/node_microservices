import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptionsWithoutRequest,
} from "passport-jwt";
import "../env.config";
import { selectSecret } from "../../cryptography/selectSecret";
import { Algorithm } from "jsonwebtoken";

const { secret, algorithm } = selectSecret();

const options_ig_exp: StrategyOptionsWithoutRequest = {
	// * ~~~~~~~~~~~~~~~~~~ "Authentication": "Bearer <token>"
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret as string | Buffer,
	algorithms: [algorithm as Algorithm],
	ignoreExpiration: true,
};
const options_exp: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret as string | Buffer,
	algorithms: [algorithm as Algorithm],
	ignoreExpiration: false,
};

const strategyCreator = (options: StrategyOptionsWithoutRequest) => {
	return new JwtStrategy(options, async (payload, done) => {
		if (payload) {
			const user = { ...payload };
			return done(null, user);
		} else {
			return done(null, false, { message: "Invalid token." });
		}
	});
};

export const useJwtStrategy = (passport: any) => {
	passport.use("jwt_ig_exp", strategyCreator(options_ig_exp));
	passport.use("jwt", strategyCreator(options_exp));
};
