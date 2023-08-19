import service from "../services/CRUDService";
import db from '../models';

let getHomePage = async (req, res) => {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', {data: JSON.stringify(data)});
}

let getUserCreatePage = (req, res) => {
    return res.render('user/create.ejs');
}

let postCreateUser = async (req, res) => {
    let message = await service.createUser(req.body);
    console.log(message);
    return res.send('Post crud user from server');
}

let getUsersPage = async (req, res) => {
    let users = await service.getAllUsers();
    return res.render('user', {users});
}

let getUserEditPage = async (req, res) => {
    let id = req.query.id;
    if(id){
        let userEdit = await service.getUserInfoById(id);
        return res.render('user/edit.ejs',{userEdit});
    }else{
        return res.send('User not found');
    }
}

let getUserUpdatePage = async (req, res) => {
    let data = req.body;
    let users = await service.updateUser(data);
    return res.render('user',{users});
}

let getUserDeletePage = async(req, res) => {
    let id = req.query.id;
    if(id){
        await service.deleteUserById(id);
        return res.send('Delete the user succeed!');
    }else{
        return res.send('User not find');
    }
}
 
module.exports = {
    getHomePage,
    getUserCreatePage,
    postCreateUser,
    getUsersPage,
    getUserEditPage,
    getUserUpdatePage,
    getUserDeletePage
}