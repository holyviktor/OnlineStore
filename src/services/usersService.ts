import * as usersAccessor from '../accessors/usersAccessor';
import {
    requiredProperties,
    regExpEmail,
    regExpPhoneNumber,
} from '../constants/usersConstants';
import { newValidationError } from '../utils/validationErrorUtil';
import { CustomError } from '../handlers/customError';
import bcrypt from 'bcrypt';
import { IUser } from '../models/userModel';

async function getUsers(): Promise<IUser[]> {
    return usersAccessor.getUsers();
}

async function getUserByLogin(login: string): Promise<IUser> {
    let user = await usersAccessor.getUserByLogin(login);
    if (!user) throw new CustomError(404, 'User not found');
    return user;
}

async function editUser(
    userLogin: string,
    userData: Partial<IUser>,
): Promise<IUser | undefined> {
    if (!(await checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    let validation = checkUser(userData, false);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    let dataToChange = { ...userData };
    if (userData.password) {
        dataToChange.password = await bcrypt.hash(
            String(userData.password),
            10,
        );
    }
    return await usersAccessor.editUser(userLogin, dataToChange);
}

async function deleteUser(userLogin: string): Promise<string> {
    if (!(await checkIfUserExists(userLogin))) {
        throw new CustomError(404, "User doesn't exists");
    }
    return usersAccessor.deleteUser(userLogin);
}

async function checkIfUserExists(userLogin: string): Promise<boolean> {
    let user: IUser = await usersAccessor.getUserByLogin(userLogin);
    return !!user;
}

function checkUser(user: Partial<IUser>, isAllRequired: boolean) {
    let isLengthCorrect = isAllRequired
        ? Object.keys(user).length === requiredProperties.length
        : Object.keys(user).length > 0;
    let isPropertiesCorrect = Object.keys(user).every(key =>
        requiredProperties.includes(key),
    );
    let isFormatCorrect = isLengthCorrect && isPropertiesCorrect;
    if (!isFormatCorrect) {
        return newValidationError(400, 'User format is not correct!');
    }

    if (user.hasOwnProperty('login') && !user.login) {
        return newValidationError(400, 'User must have login!');
    }
    if (
        user.hasOwnProperty('password') &&
        (!user.password || user.password.length < 6)
    ) {
        return newValidationError(
            400,
            'Password must be longer then 6 symbols!',
        );
    }
    if (user.hasOwnProperty('email') && !user.email?.match(regExpEmail)) {
        return newValidationError(400, 'Wrong email!');
    }
    if (
        user.hasOwnProperty('phoneNumber') &&
        !user.phoneNumber?.match(regExpPhoneNumber)
    ) {
        return newValidationError(400, 'Wrong phone number.');
    }
    return {
        status: 200,
        message: '',
        isValid: true,
    };
}

export {
    getUserByLogin,
    editUser,
    deleteUser,
    getUsers,
    checkIfUserExists,
    checkUser,
};
