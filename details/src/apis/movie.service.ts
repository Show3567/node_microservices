import { RequestHandler } from "express";
import axios from "axios";
import "../core/env.config";
import logger, { loggerErr, loggerInfo } from "../core/logger.config";
import { getConfigData } from "../config/getConfig";

// const tmdbBaseUrl = process.env.TMDB_BASE_URL;
// const moviePath = "movie";
// const tmdb_key = process.env.TMDB_KEY;

export const movieService = () => {
	const config = getConfigData();

	const movieGetReqConvert = (PATH: string): RequestHandler => {
		return async (req, res) => {
			const queryObj = { ...req.query } as { [key: string]: string };

			const url = Object.entries(queryObj).reduce(
				(acc, [key, value]) => `${acc}&${key}=${value}`,
				`${config.TMDB_BASE_URL}/${PATH}?api_key=${config.TMDB_KEY}`
			);

			const result = await axios.get(url).then((ele) => ele.data);

			logger.info(loggerInfo(`getMovie/${PATH}`, 200));
			res.status(200).json(result);
		};
	};

	const getMovieById: RequestHandler = async (req, res) => {
		const url = `${config.TMDB_BASE_URL}/movie/${req.params.id}?api_key=${config.TMDB_KEY}`;
		const result = await axios.get(url).then((ele) => ele.data);

		logger.info(loggerInfo(`getMovieById`, 200));
		res.status(200).json(result);
	};

	const getDetails = (PATH: string): RequestHandler => {
		return async (req, res) => {
			const id = req.params.id;

			if (id) {
				const url = `${config.TMDB_BASE_URL}/movie/${id}/${PATH}?api_key=${config.TMDB_KEY}`;
				const result = await axios.get(url).then((ele) => ele.data);

				logger.info(loggerInfo(`getDetails/${PATH}`, 200));
				res.status(200).json(result);
			} else {
				logger.error(
					loggerErr(`getDetails/${PATH}`, 404, "Cannot found this id")
				);
				res.status(404).json({ message: "Cannot found this id" });
			}
		};
	};

	const checkHealth: RequestHandler = (req, res) => {
		logger.info(
			loggerInfo(`checkHealth`, 201, { healthyStatus: "healthy" })
		);
		res.status(200).json({ healthyStatus: "healthy" });
	};

	return {
		movieGetReqConvert,
		getMovieById,
		getDetails,
		checkHealth,
	};
};
