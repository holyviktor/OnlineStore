function newValidationError(status: number, message: string) {
    return {
        status: status,
        message: message,
        isValid: false,
    };
}

export { newValidationError };
