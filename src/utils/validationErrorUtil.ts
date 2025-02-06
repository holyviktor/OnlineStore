import { IValidation } from '../models/validationModel';

function newValidationError(status: number, message: string): IValidation {
    return {
        status: status,
        message: message,
        isValid: false,
    };
}

export { newValidationError };
