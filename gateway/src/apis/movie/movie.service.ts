import { RequestHandler } from "express";
import axios from "axios";
import "../../core/env.config";
import logger, {
	loggerErr,
	loggerInfo,
} from "../../core/logger.config";

// const tmdbBaseUrl = process.env.TMDB_BASE_URL;
export const MovieService = () => {
	const detailServerUrl = `${process.env.DETAIL_SERVER}/api/v1`;
	const moviePath = "movie";

	const movieGetReqConvert = (PATH: string): RequestHandler => {
		return async (req, res) => {
			const queryObj = { ...req.query } as { [key: string]: string };

			const url = Object.entries(queryObj).reduce(
				(acc, [key, value]) => `${acc}&${key}=${value}`,
				`${detailServerUrl}/${PATH}?`
			);

			const result = await axios.get(url);

			logger.info(loggerInfo(`getMovie/${PATH}`, 200));
			res.status(result.status).json(result.data);
		};
	};

	const getMovieById: RequestHandler = async (req, res) => {
		const url = `${detailServerUrl}/${moviePath}/${req.params.id}`;
		const result = await axios.get(url);

		logger.info(loggerInfo(`getMovieById`, 200));
		res.status(result.status).json(result.data);
	};

	const getDetails = (PATH: string): RequestHandler => {
		return async (req, res) => {
			const id = req.params.id;

			if (id) {
				const url = `${detailServerUrl}/${moviePath}/${id}/${PATH}`;
				const result = await axios.get(url);

				logger.info(loggerInfo(`getDetails/${PATH}`, 200));
				res.status(result.status).json(result.data);
			} else {
				// expected err;
				logger.error(
					loggerErr(`getDetails/${PATH}`, 404, "Cannot found this id")
				);
				res.status(404).json({ message: "Cannot found this id" });
			}
		};
	};

	return { movieGetReqConvert, getMovieById, getDetails };
};
