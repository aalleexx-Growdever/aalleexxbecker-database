import ApiResult from '../utils/ApiResult';
import Procedure from '../models/Procedure';

class ProcedureController {
    async index(req, resp) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const { conditions } = await Procedure.parseConditions(req.query);

            const { count, rows } = await Procedure.findAndCountAll({
                where: conditions,
                limit,
                offset: (page - 1) * limit,
            });

            const data = {
                current_page: parseInt(page, 10),
                total_pages: Math.ceil(count / limit),
                total: count,
                procedures: rows,
            };

            const response = ApiResult.parseResult(
                true,
                { data },
                'Procedimento(s) retornado(s) com sucesso.'
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

            const procedure = await Procedure.findByPk(id);

            if (!procedure) {
                throw Error('Não foi possível buscar o procedimento pelo ID.');
            }

            const response = ApiResult.parseResult(
                true,
                { procedure },
                'Procedimento retornado com sucesso.'
            );

            return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Não foi possível buscar o procedimento pelo ID.'
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }

    async store(req, resp) {
        try {
            const procedure = await Procedure.create(req.body);

            const response = ApiResult.parseResult(
                true,
                { procedure },
                'Procedimento registrado com sucesso.'
            );

            return resp.status(ApiResult.OK_CREATED).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Não foi possível registrar o procedimento.'
            );

            return resp.status(ApiResult.BAD_REQUEST).json(response);
        }
    }

    async update(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);

            const updated = await Procedure.update(req.body, { where: { id } });

            if (!updated) {
                throw Error('Não foi possível atualizar o procedimento.');
            }

            const response = ApiResult.parseResult(
                true,
                'PROCEDURE_UPDATED',
                'Procedimento atualizado com sucesso.'
            );

            return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Não foi possível atualizar o procedimento.'
            );

            return resp.status(ApiResult.BAD_REQUEST).json(response);
        }
    }

    async delete(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);

            const procedure = await Procedure.findByPk(id);

            if (!procedure) {
                throw Error('Não foi possível buscar o procedimento pelo ID.');
            }

            await procedure.destroy();

            const response = ApiResult.parseResult(
                true,
                'PROCEDURE_DELETED',
                'Procedimento deletado com sucesso.'
            );

            return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Não foi possível deletar o procedimento pelo ID.'
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }
}

export default new ProcedureController();
