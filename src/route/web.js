import express  from "express";
import homeController from "../controllers/homeController";
import UserController from "../controllers/UserController";
import DoctorController from "../controllers/DoctorController";
import PatientController from "../controllers/PatientController";
import SpecialtyController from "../controllers/SpecialtyController";
import ClinicController from "../controllers/ClinicController";

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
    router.get('/api/get-schedule-doctor-by-date', DoctorController.getScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', DoctorController.getExtraInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', DoctorController.getProfileDoctorById);

    router.get('/api/get-list-patient-for-doctor', DoctorController.getListPatientForDoctor);
    router.post('/api/send-remedy', DoctorController.sendRemedy);

    router.post('/api/patient-book-appointment', PatientController.postBookAppointment);
    router.post('/api/verify-book-appointment', PatientController.postVerifyBookAppointment);
    
    router.post('/api/create-new-specialty', SpecialtyController.createNewSpecialty)
    router.get('/api/get-specialty', SpecialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', SpecialtyController.getDetailSpecialtyById);

    router.post('/api/create-new-clinic', ClinicController.createClinic);
    router.get('/api/get-clinic', ClinicController.getAllClinic);
    router.get('/api/get-detail-clinic-by-id', ClinicController.getDetailClinicById);

    return app.use('/', router);
}

module.exports = initWebRoutes;