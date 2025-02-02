import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import { CustomError } from '../handlers/customError';
import * as usersService from './usersService';
import * as usersAccessor from '../accessors/usersAccessor';
import { IUser } from '../models/userModel';

dotenv.config();

async function loginUser(login: string, password: string): Promise<string> {
    const user: IUser = await usersService.getUserByLogin(login);
    if (!(await bcrypt.compare(password, String(user.password)))) {
        throw new CustomError(400, 'Wrong login or password!');
    }
    return issueToken({ login: user.login, role: user.role });
}

async function addUser(
    user: Pick<IUser, 'login' | 'password' | 'email' | 'phoneNumber'>,
): Promise<IUser> {
    if (user.login && (await usersService.checkIfUserExists(user.login))) {
        throw new CustomError(400, 'User with this login already exists');
    }
    let validation = usersService.checkUser(user, true);
    if (!validation.isValid) {
        throw new CustomError(validation.status, validation.message);
    }
    const hashedPassword = await bcrypt.hash(String(user.password), 10);
    return usersAccessor.addUser({ ...user, password: hashedPassword });
}

function issueToken(user: Pick<IUser, 'login' | 'role'>): string {
    return jwt.sign({ ...user, iss: 'Node-Auth' }, process.env.SECRET_KEY!, {
        expiresIn: +process.env.TOKEN_EXPIRY_TIME!,
    });
}

export { loginUser, addUser };
