
class AppError extends Error {
    constructor(
        public name: string,
        public statusCode: number,
        public description: string,
        public isOperational: boolean = true,
        public errorStack: boolean = false,
        public logingErrorResponse: boolean = false,
    ) {
        super(description);
        this.name = `${name} [${statusCode}]`;

        Object.setPrototypeOf(this, AppError.prototype);

        if (this.errorStack) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            error: this.name,
            statusCode: this.statusCode,
            description: this.description,
        };
    }
}
class BadRequest extends AppError {
    constructor(public description: string = "Bad request") {
        super("BAD REQUEST", 400, description, true, false, true);
    }
}

class ValidationError extends AppError {
    constructor(public description: string = "Validation Error") {
        super("VALIDATION ERROR", 400, description);
    }
}

class AuthorizationError extends AppError {
    constructor(public description: string = "Unauthorized  Error") {
        super("UNAUTHORIZED", 401, description, true, false);
    }
}

class ServerError extends AppError {
    constructor(public description: string = "Internal Server Error") {
        super("SERVER ERROR", 500, description, true, false);
    }
}



export {
    AppError,
    BadRequest,
    ValidationError,
    AuthorizationError,
    ServerError
}