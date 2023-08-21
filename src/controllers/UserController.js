import UserService from "../services/UserService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        });
    }
    let userData = await UserService.handleUserLogin(email,password);
    res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}  
    });
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        });
    }

    let users = await UserService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    });
}

let handleCreateUser = async (req,res) => {
    let message = await UserService.createUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req,res) => {
    let data = req.body;
    let message = await UserService.updateUser(data);
    return res.status(200).json({message});
}

let handleDeleteUser = async () => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'
        });
    }
    let message = await UserService.deleteUser(req.body.id);
    return res.status(200).json({message});
 }

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser
}