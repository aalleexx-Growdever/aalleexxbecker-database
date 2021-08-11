import { Router } from 'express';
import ProcedureController from '../controllers/ProcedureController';
import {
    validateData,
    verifyId,
    verifyNameParam,
} from '../middlewares/procedure';

const routes = new Router();

routes.get('/procedures', verifyNameParam, ProcedureController.index);
routes.get('/procedures/:id', verifyId, ProcedureController.show);
routes.post('/procedures', validateData, ProcedureController.store);
routes.put(
    '/procedures/:id',
    [verifyId, validateData],
    ProcedureController.update
);
routes.delete('/procedures/:id', verifyId, ProcedureController.delete);

export default routes;
