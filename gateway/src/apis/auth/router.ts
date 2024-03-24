import express, { RequestHandler } from "express";

export const userRouters = ({
	signIn,
	signUp,
	updateUser,
	deleteUserById,
	refreshToken,
	getUsers,
	checkEmail,
}: {
	[key: string]: RequestHandler;
}) => {
	const router = express.Router();

	router.route("/users").get(getUsers);
	router.route("/signin").post(signIn);
	router.route("/signup").post(signUp);
	router.route("/check-email").post(checkEmail);
	router.route("/userupdate").patch(updateUser);
	router.route("/refresh-token").get(refreshToken);
	router.route("/users/:id").delete(deleteUserById);

	return router;
};
