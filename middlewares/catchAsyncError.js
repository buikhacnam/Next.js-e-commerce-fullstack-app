export default catchAsyncError => (req, res, next) => 
    Promise.resolve(catchAsyncError(req, res, next))
        .catch(next)

