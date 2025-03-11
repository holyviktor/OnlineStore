import bcrypt from 'bcrypt';
import { addUser, isAdminExist } from '../accessors/usersAccessor';
import { IUser } from '../models/userModel';
require('dotenv').config();

export async function createAdminIfNotExists():Promise<IUser | undefined>{
    if (!await isAdminExist()){
        if (process.env.ADMIN_PASSWORD && process.env.ADMIN_EMAIL && process.env.ADMIN_PHONENUMBER) {
            let user: Pick<IUser, 'login' | 'password' | 'email' | 'phoneNumber'> = {
                login: 'admin',
                password: await bcrypt.hash(String(process.env.ADMIN_PASSWORD), 10),
                email: process.env.ADMIN_EMAIL,
                phoneNumber: process.env.ADMIN_PHONENUMBER
            }
            return addUser(user, 'admin');
        }
    }
}