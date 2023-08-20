import express  from "express";
import homeController from "../controllers/homeController";
import UserController from "../controllers/UserController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/users', homeController.getUsersPage);
    router.get('/user/create', homeController.getUserCreatePage);
    router.get('/user/edit', homeController.getUserEditPage);
    router.get('/user/delete', homeController.getUserDeletePage);
    router.post('/user/update', homeController.getUserUpdatePage);
    router.post('/post-crud', homeController.postCreateUser);

    router.post('/api/login', UserController.handleLogin);
    router.get('/api/get-all-users', UserController.handleGetAllUsers);

    return app.use('/', router);
}

module.exports = initWebRoutes;