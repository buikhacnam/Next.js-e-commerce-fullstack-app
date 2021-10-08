import ErrorHandler from '../utils/errorHandler'

const onError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    let error = {...err}
    error.message = err.message

    //wrong Mongoosse ObjectId error
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`
        error = new ErrorHandler(message, 404)
    }

    // handling monogoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        error,
        message: error.message,
        stack: error.stack
    })

}

export default onError