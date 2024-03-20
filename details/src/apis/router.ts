import express from "express";
import {
	getDetails,
	getMovieById,
	movieGetReqConvert,
} from "./movie.service";

const movieRouter = express.Router();

movieRouter
	.route("/discover/movie")
	.get(movieGetReqConvert("discover/movie"));
movieRouter
	.route("/search/movie")
	.get(movieGetReqConvert("search/movie"));
movieRouter.route("/movie/:id").get(getMovieById);
movieRouter.route("/movie/:id/credits").get(getDetails("credits"));
movieRouter.route("/movie/:id/images").get(getDetails("images"));
movieRouter.route("/movie/:id/videos").get(getDetails("videos"));

export default movieRouter;
