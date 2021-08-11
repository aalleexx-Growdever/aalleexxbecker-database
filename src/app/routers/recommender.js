import { Router } from "express";
import RecommenderController from "../controllers/RecommenderController";
import validateRecommenderId from "../middlewares/recommender";

const routes = new Router();

routes.get("/recommenders", RecommenderController.index);
routes.get(
    "/recommenders/:id",
    validateRecommenderId,
    RecommenderController.show
);

export default routes;
