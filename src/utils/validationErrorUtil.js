function newValidationError(status, message) {
    return {
        status: status,
        message: message,
        isValid: false,
    };
}

module.exports = newValidationError;
