import { Router } from 'express';
import AnamneseController from '../controllers/AnamneseController';
import {
    validateData,
    verifyIdParam,
    verifyPatientId,
    verifyNameQuery,
    verifyAlredyExist,
} from '../middlewares/anamnese';

const routes = new Router();

routes.get('/anamneses', verifyNameQuery, AnamneseController.index);
routes.get('/anamneses/:id', verifyIdParam, AnamneseController.show);
routes.post(
    '/anamneses',
    [verifyPatientId, verifyAlredyExist, validateData],
    AnamneseController.store
);
routes.put(
    '/anamneses/:id',
    [verifyIdParam, verifyPatientId, validateData],
    AnamneseController.update
);
routes.delete('/anamneses/:id', verifyIdParam, AnamneseController.delete);

export default routes;
