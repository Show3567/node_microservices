export class ApiError extends Error {
	name = this.constructor.name;

	constructor(public statusCode: number, message: string) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends ApiError {
	constructor(message = "Resource not found") {
		super(404, message);
	}
}

export class BadRequestError extends ApiError {
	constructor(message = "Bad Request") {
		super(400, message);
	}
}
