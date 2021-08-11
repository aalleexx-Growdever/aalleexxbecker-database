import { Router } from "express";
import PatientController from "../controllers/PatientController";
import {
    validateData,
    validatePatientExist,
    verifyNameParam,
} from "../middlewares/patient";

const routes = new Router();

routes.get("/patients", verifyNameParam, PatientController.index);
routes.get("/patients/:id", validatePatientExist, PatientController.show);
routes.post("/patients", validateData, PatientController.store);
routes.put(
    "/patients/:id",
    [validateData, validatePatientExist],
    PatientController.update
);
routes.delete("/patients/:id", validatePatientExist, PatientController.delete);

export default routes;
