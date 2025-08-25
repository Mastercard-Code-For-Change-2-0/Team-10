import {Router} from "express";
import SignUpController from "../controller/SignUpController.js";
import SignUpValidation from "../middlewares/SignUpValidation.js";
import LoginValidation from "../middlewares/LoginValidation.js";
import LoginController from "../controller/LoginController.js";
import AuthorisationRoute from "../middlewares/AuthorisationRoute.js";
import verifyEmailExists from "../middlewares/verifyEmailExist.js";
import getDonorDashboardData from "../controller/DonorController.js";
import getReceiverDashboardData from "../controller/RecieverController.js";
import getAdminDashboardData from "../controller/AdminController.js";
const routes = Router();

routes.post("/signup", SignUpValidation, SignUpController);
routes.post("/login",LoginValidation, LoginController);

routes.get('/donor/dashboard',
    verifyEmailExists,
    AuthorisationRoute('admin', 'donor'), 
    getDonorDashboardData
);


routes.get('/reciever/dashboard',
    verifyEmailExists,
    AuthorisationRoute('admin', 'reciever'), 
    getReceiverDashboardData
);

routes.get('/admin/dashboard',
    verifyEmailExists,
    AuthorisationRoute('admin'),
    getAdminDashboardData
);

export default routes;