import "../models/index";
import bcrypt from 'bcryptjs'
import db from "../models/index";

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

module.exports = {
    handleUserLogin,
    getAllUsers
}