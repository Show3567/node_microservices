import express from "express";
import passport from "passport";
import {
	getDetails,
	getMovieById,
	movieGetReqConvert,
} from "./movie.service";

const movieRouter = express.Router();

movieRouter
	.route("/discover/movie")
	.get(
		passport.authenticate("jwt", { session: false }),
		movieGetReqConvert("discover/movie")
	);
movieRouter
	.route("/search/movie")
	.get(
		passport.authenticate("jwt", { session: false }),
		movieGetReqConvert("search/movie")
	);
movieRouter
	.route("/movie/:id")
	.get(
		passport.authenticate("jwt", { session: false }),
		getMovieById
	);
movieRouter
	.route("/movie/:id/credits")
	.get(
		passport.authenticate("jwt", { session: false }),
		getDetails("credits")
	);
movieRouter
	.route("/movie/:id/images")
	.get(
		passport.authenticate("jwt", { session: false }),
		getDetails("images")
	);
movieRouter
	.route("/movie/:id/videos")
	.get(
		passport.authenticate("jwt", { session: false }),
		getDetails("videos")
	);

export default movieRouter;
