import express from "express";
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

userRouters.route("/users").get(getUsers);
userRouters.route("/signin").post(signIn);
userRouters.route("/signup").post(signUp);
userRouters.route("/check-email").post(checkEmail);
userRouters.route("/userupdate").patch(updateUser);
userRouters.route("/refresh-token").get(refreshToken);
userRouters.route("/users/:id").delete(deleteUserById);

export default userRouters;
