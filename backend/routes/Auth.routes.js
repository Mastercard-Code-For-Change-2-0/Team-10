import {Router} from "express";
import SignUpController from "../controller/SignUpController.js";
import SignUpValidation from "../middlewares/SignUpValidation.js";
import LoginValidation from "../middlewares/LoginValidation.js";
import LoginController from "../controller/LoginController.js";
const routes = Router();

routes.post("/signup", SignUpValidation, SignUpController);
routes.post("/login",LoginValidation, LoginController);


export default routes;