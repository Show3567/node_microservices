import express from "express";
import passport from "passport";

import { CheckEmailDto } from "./dto/check-email.dto";
import { SignInCredentialsDto } from "./dto/signin.dto";
import { SignUpCredentialsDto } from "./dto/signup.dto";
import { UpdateCredentialDto } from "./dto/update-user.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

import {
	checkEmail,
	deleteUserById,
	getUsers,
	refreshToken,
	signIn,
	signUp,
	updateUser,
} from "./auth.service";
import { dtoCheck } from "../core/middleware/auth.middleware";

const userRouters = express.Router();

userRouters.route("/users").get(getUsers);

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
	.patch(dtoCheck(UpdateCredentialDto), updateUser);

userRouters.route("/refresh-token").get(refreshToken);

userRouters.route("/users/:id").delete(deleteUserById);

export default userRouters;
