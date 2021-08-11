import ApiResult from '../utils/ApiResult';
import Procedure from '../models/Procedure';

function validateData(req, resp, next) {
    try {
        const { name, description } = req.body;

        if (typeof name !== 'string' || name.trim().length === 0) {
            throw Error(
                'Não foi possível validar os dados do campo "nome" no formulário'
            );
        }

        if (
            typeof description !== 'string' ||
            description.trim().length === 0
        ) {
            throw Error(
                'Não foi possível validar os dados do campo "descrição" no formulário'
            );
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'INVALID_PARAMS',
            error.message ? error.message : error,
            'Não foi possível validar os dados do formulário'
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function verifyId(req, resp, next) {
    try {
        const id = parseInt(req.params.id, 10);

        if (
            typeof id !== 'number' ||
            id.length === 0 ||
            !Number.isInteger(id)
        ) {
            throw Error('Não foi possível validar o ID informado');
        }

        const procedure = await Procedure.findOne({ where: { id } });

        if (!procedure) {
            throw Error('Não foi possível encontrar dados relacionados ao ID');
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'INVALID_ID_PARAM',
            error.message ? error.message : error,
            'O ID informado é inválido.'
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function verifyNameParam(req, resp, next) {
    try {
        const { name } = req.query;

        if (name) {
            if (typeof name !== 'string' || name.trim().length === 0) {
                throw Error('Não foi possível validar o parâmetro de busca.');
            }

            const procedure = await Procedure.findOne({ where: { name } });

            if (!procedure) {
                throw Error(
                    'Não foi possível encontrar dados relacionados ao parâmetro de busca.'
                );
            }
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'INVALID_NAME_QUERY_PARAM',
            error.message ? error.message : error,
            'O parâmetro de busca informado é inválido.'
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

export { validateData, verifyId, verifyNameParam };
