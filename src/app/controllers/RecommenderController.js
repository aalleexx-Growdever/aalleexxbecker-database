import { Op } from 'sequelize';
import Patient from '../models/Patient';
import ApiResult from '../utils/ApiResult';

class RecommenderController {
    async index(req, resp) {
        try {
            const { page = 1, limit = 10 } = req.query;

            const { count, rows } = await Patient.findAndCountAll({
                where: {
                    recommender_id: { [Op.ne]: null },
                },
                include: [
                    {
                        model: Patient,
                        as: 'recommender',
                        attributes: ['name'],
                    },
                ],
                order: [['recommender_id', 'ASC']],
                limit,
                offset: (page - 1) * limit,
            });

            const data = {
                current_page: parseInt(page, 10),
                total_pages: Math.ceil(count / limit),
                total: count,
                recommenders: rows,
            };

            const response = ApiResult.parseResult(
                true,
                { data },
                'Recomendadores retornados(as) com sucesso.'
            );

            return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Não foram encontrados dados para serem listados.'
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }

    async show(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);
            const { page = 1, limit = 10 } = req.query;

            const { count, rows } = await Patient.findAndCountAll({
                where: { recommender_id: id },
                include: [
                    {
                        model: Patient,
                        as: 'recommender',
                        attributes: ['name'],
                    },
                ],
                order: [['name', 'ASC']],
                limit,
                offset: (page - 1) * limit,
            });

            const data = {
                current_page: parseInt(page, 10),
                total_pages: Math.ceil(count / limit),
                total: count,
                recommenders: rows,
            };

            const response = ApiResult.parseResult(
                true,
                { data },
                'Dados relacionados com o ID de recomendador(a) retornados com sucesso.'
            );

            return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Não foi possível buscar o(a) paciente pelo ID.'
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }
}

export default new RecommenderController();
