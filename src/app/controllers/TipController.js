import ApiResult from '../utils/ApiResult';
import Tip from '../models/Tips';

class TipController {
    async index(req, resp) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const { conditions } = await Tip.parseConditions(req.query);

            const { count, rows } = await Tip.findAndCountAll({
                where: conditions,
                limit,
                offset: (page - 1) * limit,
            });

            const data = {
                current_page: parseInt(page, 10),
                total_pages: Math.ceil(count / limit),
                total: count,
                tips: rows,
            };

            const response = ApiResult.parseResult(
                true,
                { data },
                'Dica(s) retornada(s) com sucesso.'
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
            //
        } catch (error) {
            //
        }
    }

    async store(req, resp) {
        try {
            const tip = await Tip.create(req.body);

            const response = ApiResult.parseResult(
                true,
                { tip },
                'Dica registrada com sucesso.'
            );

            return resp.status(ApiResult.OK_CREATED).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Não foi possível registrar a dica.'
            );

            return resp.status(ApiResult.BAD_REQUEST).json(response);
        }
    }

    async update(req, resp) {
        try {
            //
        } catch (error) {
            //
        }
    }

    async delete(req, resp) {
        try {
            //
        } catch (error) {
            //
        }
    }
}

export default new TipController();
