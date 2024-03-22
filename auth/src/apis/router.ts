import express, { RequestHandler } from "express";
import passport from "passport";

import { UpdateCredentialDto } from "./dto/update-user.dto";
import { dtoCheck } from "../core/middleware/auth.middleware";
import { CheckEmailDto } from "./dto/check-email.dto";
import { SignInCredentialsDto } from "./dto/signin.dto";
import { SignUpCredentialsDto } from "./dto/signup.dto";

export const userRouters = (apis: {
	[key: string]: RequestHandler;
}) => {
	const userRouter = express.Router();

	userRouter
		.route("/users")
		.get(
			passport.authenticate("jwt", { session: false }),
			apis.getUsers
		);

	userRouter.route("/signin").post(
		dtoCheck(SignInCredentialsDto, (errors) => {
			return errors.map((error: any) => {
				if (error.target && error.target.password) {
					delete error.target.password;
				}
				return error;
			});
		}),
		apis.signIn
	);
	userRouter
		.route("/signup")
		.post(dtoCheck(SignUpCredentialsDto), apis.signUp);

	userRouter
		.route("/check-email")
		.post(dtoCheck(CheckEmailDto), apis.checkEmail);
	userRouter
		.route("/userupdate")
		.patch(
			dtoCheck(UpdateCredentialDto),
			passport.authenticate("jwt", { session: false }),
			apis.updateUser
		);
	userRouter
		.route("/refresh-token")
		.get(
			passport.authenticate("jwt_ig_exp", { session: false }),
			apis.refreshToken
		);
	userRouter
		.route("/users/:id")
		.delete(
			passport.authenticate("jwt", { session: false }),
			apis.deleteUserById
		);

	return userRouter;
};
