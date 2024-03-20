import express from "express";
import passport from "passport";

import {
	checkEmail,
	deleteUserById,
	getUsers,
	refreshToken,
	signIn,
	signUp,
	updateUser,
} from "./auth.service";
import { UpdateCredentialDto } from "./dto/update-user.dto";
import { dtoCheck } from "../core/middleware/auth.middleware";
import { CheckEmailDto } from "./dto/check-email.dto";
import { SignInCredentialsDto } from "./dto/signin.dto";
import { SignUpCredentialsDto } from "./dto/signup.dto";

const userRouters = express.Router();

userRouters
	.route("/users")
	.get(passport.authenticate("jwt", { session: false }), getUsers);

userRouters.route("/signin").post(
	dtoCheck(SignInCredentialsDto, (errors) => {
		return errors.map((error: any) => {
			if (error.target && error.target.password) {
				delete error.target.password;
			}
			return error;
		});
	}),
	signIn
);
userRouters
	.route("/signup")
	.post(dtoCheck(SignUpCredentialsDto), signUp);

userRouters
	.route("/check-email")
	.post(dtoCheck(CheckEmailDto), checkEmail);
userRouters
	.route("/userupdate")
	.patch(
		dtoCheck(UpdateCredentialDto),
		passport.authenticate("jwt", { session: false }),
		updateUser
	);
userRouters
	.route("/refresh-token")
	.get(
		passport.authenticate("jwt_ig_exp", { session: false }),
		refreshToken
	);
userRouters
	.route("/users/:id")
	.delete(
		passport.authenticate("jwt", { session: false }),
		deleteUserById
	);

export default userRouters;
