"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlingMidleware = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (err.statusCode === 404) {
        res
            .status(err.statusCode)
            .json({ errors: err.status, errorMessage: err.message });
    }
    else {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
};
exports.default = errorHandlingMidleware;
