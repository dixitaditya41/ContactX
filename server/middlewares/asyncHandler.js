const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
        if (!res.headersSent) {     
            res.status(500).json({ message: error.message });
        }
    });
 };
 
 module.exports = { asyncHandler };
 