import bcrypt from 'bcryptjs'
import db from '../models';
const salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPasswordUser = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordUser,
                firstname: data.firstname,
                lastname: data.lastname,
                phonenumber: data.phonenumber,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve('Oke create a new user succeed!');
        } catch (e) {
            reject(e);
        }
    });
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    });
}

module.exports = {
    createUser,
    hashUserPassword
}