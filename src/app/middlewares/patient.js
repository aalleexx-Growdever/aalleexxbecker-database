import Patient from '../models/Patient';
import ApiResult from '../utils/ApiResult';

async function validateData(req, resp, next) {
    const { name, birthdate, contact, genre, howMet } = req.body;
    const id = parseInt(req.params.recommenderId, 10);

    try {
        if (typeof name !== 'string' || name.length === 0) {
            throw Error(
                'Não foi possível validar os dados enviados. Verifique o campo nome.'
            );
        }
        if (/[0-9]+/.test(name)) {
            throw Error(
                'Não foi possível validar o parâmetro nome. Por favor verifique se o nome está correto.'
            );
        }
        if (birthdate.length === 0) {
            throw Error(
                'Não foi possível validar os dados enviados. Verifique o campo data de nascimento.'
            );
        }
        if (typeof contact !== 'string' || contact.length === 0) {
            throw Error(
                'Não foi possível validar os dados enviados. Verifique o campo contato.'
            );
        }
        if (typeof genre !== 'string' || genre.length === 0) {
            throw Error(
                'Não foi possível validar os dados enviados. Verifique o campo gênero.'
            );
        }
        if (typeof howMet !== 'string' || howMet.length === 0) {
            throw Error(
                'Não foi possível validar os dados enviados. Verifique o campo indicação.'
            );
        }
        if (id) {
            if (typeof id !== 'number' || id.length === 0) {
                throw Error(
                    'Não foi possível validar os dados enviados. Verifique o campo ID de quem indicou.'
                );
            }

            const recommender = await Patient.findOne({
                where: { id },
            });

            if (!recommender) {
                throw Error(
                    'Não foi possível encontrar o(a) recomendador(a) com o ID informado.'
                );
            }
        }

        const patient = await Patient.findOne({ where: { name } });

        if (patient) {
            throw Error('Nome do paciente já registrado.');
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'INVALID_PATIENT_DATA_PARAMS',
            error.message ? error.message : error,
            'Dados enviados inválidos. Por favor verifique os campos preenchidos.'
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function verifyNameParam(req, resp, next) {
    try {
        const { name } = req.query;

        if (name) {
            if (/[0-9]+/.test(name)) {
                throw Error(
                    'Não foi possivel validar o parâmetro nome. Por favor verifique se o nome está correto e efetue uma nova pesquisa.'
                );
            }

            const patient = await Patient.findOne({
                where: { name },
            });

            if (!patient) {
                throw Error(
                    'Não foi possível encontrar nenhum paciente com o nome pesquisado.'
                );
            }
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'INVALID_NAME_PARAMS',
            error.message ? error.message : error,
            'Parâmetro nome inválido. Por favor verifique se o nome está correto.',
            Error
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function validatePatientExist(req, resp, next) {
    const id = parseInt(req.params.id, 10);

    try {
        if (id.length === 0) {
            throw Error(
                'Parâmetro ID obrigatório para requisição não informado.'
            );
        }
        if (!Number.isInteger(id)) {
            throw Error('Parâmetro ID deve ser um número inteiro.');
        }

        const patient = await Patient.findOne({
            where: { id },
        });

        if (!patient) {
            throw Error(
                'Não foi possível encontrar o(a) paciente com o ID informado.'
            );
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'PATIENT_DATA_NOT_FOUND',
            error.message ? error.message : error,
            Error
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

export { validateData, validatePatientExist, verifyNameParam };
