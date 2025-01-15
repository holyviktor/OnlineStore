function newValidationError(validation, status, message){
    validation.status = status;
    validation.message = message;
    validation.isValid = false;

    return validation;
}

module.exports = newValidationError;