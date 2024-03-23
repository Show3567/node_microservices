import express, { RequestHandler } from "express";

export const movieRouter = ({
	movieGetReqConvert,
	getMovieById,
	getDetails,
	checkHealth,
}: {
	[key: string]: any;
}) => {
	const router = express.Router();

	router
		.route("/discover/movie")
		.get(movieGetReqConvert("discover/movie"));
	router
		.route("/search/movie")
		.get(movieGetReqConvert("search/movie"));
	router.route("/movie/:id").get(getMovieById);
	router.route("/movie/:id/credits").get(getDetails("credits"));
	router.route("/movie/:id/images").get(getDetails("images"));
	router.route("/movie/:id/videos").get(getDetails("videos"));

	router.route("/check-healthy").get(checkHealth);

	return router;
};
