import { Router } from "express";

import NomeController from "./app/controllers/NomeController";

import logRequestsMiddleware from "./app/middlewares/logRequests";

const routes = new Router();

routes.use(logRequestsMiddleware);

routes.get("/growdevers", GrowdeverController.index);

export default routes;
