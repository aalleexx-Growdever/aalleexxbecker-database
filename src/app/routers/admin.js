import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import {
  validateData,
  validateAdminExist,
  compareLogins,
  verifyNameParam,
} from '../middlewares/admin';

const routes = new Router();

routes.get('/admins', verifyNameParam, AdminController.index);
routes.get('/admins/:id', validateAdminExist, AdminController.show);
routes.post('/admins', [validateData, compareLogins], AdminController.store);
routes.put(
  '/admins/:id',
  [validateData, validateAdminExist, compareLogins],
  AdminController.update
);
routes.delete('/admins/:id', validateAdminExist, AdminController.delete);

export default routes;
