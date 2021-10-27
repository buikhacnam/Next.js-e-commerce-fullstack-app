/* eslint-disable import/no-anonymous-default-export */
export default catchAsyncError => (req, res, next) => 
    Promise.resolve(catchAsyncError(req, res, next))
        .catch(next)

