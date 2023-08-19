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
    console.log(users); 
    return res.render('user', {users});
}
 
module.exports = {
    getHomePage,
    getUserCreatePage,
    postCreateUser,
    getUsersPage
}