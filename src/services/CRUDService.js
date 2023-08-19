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

let getAllUsers = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        }catch(e){
            reject(e);
        }
    });
}

let getUserInfoById = (idUser) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: idUser},
                raw: true
            });
            if(user){
                resolve(user);
            }else{
                resolve([]);
            }
        }catch(e){
            reject(e);
        }
    });
}

let updateUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: data.id},
            });
            if(user){
                user.firstname = data.firstname,
                user.lastname = data.lastname,
                user.email = data.email,
                user.phonenumber = data.phonenumber,
                user.address = data.address,

                await user.save();

                let allUser = await db.User.findAll();
                resolve(allUser);
            }else{
                resolve();
            }
        }catch(e){
            reject(e);
        }
    });
}

module.exports = {
    createUser,
    hashUserPassword,
    getAllUsers,
    getUserInfoById,
    updateUser
}