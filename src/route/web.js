import express  from "express";
import homeController from "../controllers/homeController";
import UserController from "../controllers/UserController";
import DoctorController from "../controllers/DoctorController";

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
    router.post('/api/create-user', UserController.handleCreateUser);
    router.put('/api/edit-user', UserController.handleEditUser);
    router.delete('/api/delete-user', UserController.handleDeleteUser);

    router.get('/api/allcode', UserController.getAllCode);

    router.get('/api/top-doctor-home', DoctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', DoctorController.getAllDoctors);
    router.post('/api/save-info-doctors', DoctorController.postInfoDoctor);
    router.get('/api/get-detail-doctor-by-id', DoctorController.getDetailDoctorById);

    router.post('/api/bulk-create-schedule', DoctorController.bulkCreateSchedule);

    return app.use('/', router);
}

module.exports = initWebRoutes;