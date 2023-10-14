import "../models/index";
import bcrypt from 'bcryptjs'
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}


let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let user = await checkUserEmail(email);
            if(user){
                let check = bcrypt.compareSync(password, user.password);
                if(check){
                    userData.errCode = 0;
                    userData.errMessage = 'Ok';
                    delete user.password;
                    userData.user = user;
                }else{
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong password';
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Please try other email`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
}

let checkUserEmail = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                attributes: ['email', 'roleId', 'password'],
                where: {email : email},
                raw: true
            });
            if(user){
                resolve(user);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}

let getAllUsers = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = '';
            if(id === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }else{
                users = await db.User.findOne({
                    where: {id : id},
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

let createUser = (data) => {
    return new Promise( async(resolve, reject) => {
        try {
            // check email
            let check = await checkUserEmail(data.email);
            if(check){
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, please try another email'
                });
            }else{
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
                resolve({
                    errCode: 0,
                    message: 'Ok'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let deleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userDelete = await db.User.findOne({
                where: {id: id}
            })
            if(!userDelete){
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }else{
                await db.User.destroy({
                    where: {id: id}
                })
                resolve({
                    errCode: 0,
                    message: 'The user is deleted'
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id, },
                raw: false
            });
            if (user) {
                user.firstname = data.firstname,
                user.lastname = data.lastname,
                user.email = data.email,
                user.phonenumber = data.phonenumber,
                user.address = data.address,
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update the user succeed'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                });
            }
        } catch (e) {
            reject(e);
        }
    });
} 

let getAllCodeService = type => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!type){
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameters!'
                })
            }else{
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: {type: type}
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        } catch (error) {
            
        }
    });
}

module.exports = {
    handleUserLogin,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getAllCodeService
}