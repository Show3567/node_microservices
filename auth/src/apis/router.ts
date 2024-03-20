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

const userRouters = express.Router();

userRouters
	.route("/users")
	.get(passport.authenticate("jwt", { session: false }), getUsers);

userRouters.route("/signin").post(signIn);
userRouters.route("/signup").post(signUp);

userRouters.route("/check-email").post(checkEmail);
userRouters
	.route("/userupdate")
	.patch(
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
