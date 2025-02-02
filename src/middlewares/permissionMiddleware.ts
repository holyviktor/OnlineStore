import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../handlers/customError';

function checkPermissions(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (
        !req.user ||
        (req.user.role !== 'admin' && req.params.userLogin !== req.user.login)
    ) {
        throw new CustomError(403, 'Access denied!');
    }
    next();
}

export { checkPermissions };
