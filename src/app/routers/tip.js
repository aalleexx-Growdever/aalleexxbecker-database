import { Router } from 'express';
import TipController from '../controllers/TipController';
import { validateData, verifyId, verifySubjectParam } from '../middlewares/tip';

const routes = new Router();

routes.get('/tips', verifySubjectParam, TipController.index);
routes.get('/tips/:id', verifyId, TipController.show);
routes.post('/tips', validateData, TipController.store);
routes.put('/tips/:id', [verifyId, validateData], TipController.update);
routes.delete('/tips/:id', verifyId, TipController.delete);

export default routes;
