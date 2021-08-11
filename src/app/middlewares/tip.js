import ApiResult from '../utils/ApiResult';
import Tip from '../models/Tips';

function validateData(req, resp, next) {
    try {
        const { subject, text } = req.body;

        if (typeof subject !== 'string' || subject.trim().length === 0) {
            throw Error(
                'Não foi possível validar os dados do campo "assunto" no formulário'
            );
        }

        if (typeof text !== 'string' || text.trim().length === 0) {
            throw Error(
                'Não foi possível validar os dados do campo "texto" no formulário'
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

        const tip = await Tip.findOne({ where: { id } });

        if (!tip) {
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

async function verifySubjectParam(req, resp, next) {
    try {
        const { subject } = req.query;

        if (subject) {
            if (typeof subject !== 'string' || subject.trim().length === 0) {
                throw Error('Não foi possível validar o parâmetro de busca.');
            }

            const tip = await Tip.findOne({ where: { subject } });

            if (!tip) {
                throw Error(
                    'Não foi possível encontrar dados relacionados ao parâmetro de busca.'
                );
            }
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'INVALID_SUBJECT_QUERY_PARAM',
            error.message ? error.message : error,
            'O parâmetro de busca informado é inválido.'
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

export { validateData, verifyId, verifySubjectParam };
