import express  from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/user/create', homeController.getUserCreatePage);
    router.post('/post-crud', homeController.postCreateUser);

    return app.use('/', router);
}

module.exports = initWebRoutes;