class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new ApiError(400, message || 'Bad Request');
    }

    static unauthorized(message) {
        return new ApiError(401, message || 'Unauthorized');
    }

    static forbidden(message) {
        return new ApiError(403, message || 'Forbidden');
    }

    static notFound(message) {
        return new ApiError(404, message || 'Not Found');
    }

    static internalServerError(message) {
        return new ApiError(500, message || 'Internal Server Error');
    }
}

module.exports = ApiError;