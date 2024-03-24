import express, { RequestHandler } from "express";
import passport from "passport";

export const movieRouter = ({
	movieGetReqConvert,
	getMovieById,
	getDetails,
}: any) => {
	const router = express.Router();

	router
		.route("/discover/movie")
		.get(
			passport.authenticate("jwt", { session: false }),
			movieGetReqConvert("discover/movie")
		);
	router
		.route("/search/movie")
		.get(
			passport.authenticate("jwt", { session: false }),
			movieGetReqConvert("search/movie")
		);
	router
		.route("/movie/:id")
		.get(
			passport.authenticate("jwt", { session: false }),
			getMovieById
		);
	router
		.route("/movie/:id/credits")
		.get(
			passport.authenticate("jwt", { session: false }),
			getDetails("credits")
		);
	router
		.route("/movie/:id/images")
		.get(
			passport.authenticate("jwt", { session: false }),
			getDetails("images")
		);
	router
		.route("/movie/:id/videos")
		.get(
			passport.authenticate("jwt", { session: false }),
			getDetails("videos")
		);

	return router;
};
