import { Response, Request, NextFunction } from 'express';
import { CustomError } from './customError';

function handleErrors(
    err: CustomError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const statusCode = 'status' in err ? err.status : 500;
    console.log(err.message, err.stack);
    res.status(statusCode).send(err.message);
}

export { handleErrors };
