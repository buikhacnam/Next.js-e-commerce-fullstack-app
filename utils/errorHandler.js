class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
        //help to find the location of error:
        Error.captureStackTrace(this, this.constructor)
	}
}

export default ErrorHandler
