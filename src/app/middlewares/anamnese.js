import ApiResult from '../utils/ApiResult';
import Anamnese from '../models/Anamnese';
import Patient from '../models/Patient';

function validateData(req, resp, next) {
    const {
        smoker,
        circulatoryDisorder,
        workout,
        regularMenstrualCicle,
        diabetes,
        heartProblems,
        hormonaldisorder,
        bloodPressure,
        pacemaker,
        varicoseVeinsOrThrombosis,
        pregnant,
        medicalTreatment,
        treatmentDescription,
        allergy,
        allergyDescription,
        recentSurgery,
        surgeryDescription,
        tumorOrCancer,
        tumorOrCancerDescription,
        skinProblems,
        skinProblemsDescription,
        orthopedicProblems,
        orthopedicProblemsDescription,
        prosthesis,
        prosthesisDescription,
        acuteInflammation,
        inflammationDescription,
        necessaryInformation,
        informationDescription,
    } = req.body;

    const mandatory = [
        smoker,
        circulatoryDisorder,
        workout,
        diabetes,
        heartProblems,
        bloodPressure,
        pacemaker,
        varicoseVeinsOrThrombosis,
        medicalTreatment,
        allergy,
        recentSurgery,
        tumorOrCancer,
        skinProblems,
        orthopedicProblems,
        prosthesis,
        acuteInflammation,
        necessaryInformation,
    ];

    const womenMandatory = [regularMenstrualCicle, pregnant, hormonaldisorder];

    const { patientGenre } = req.body;

    try {
        mandatory.forEach(field => {
            if (typeof field !== 'string' || field.length === 0) {
                throw Error(`Verifique o campo "${field}" do formulário.`);
            }
        });

        if (patientGenre === 'feminino') {
            womenMandatory.forEach(field => {
                if (typeof field !== 'string' || field.length === 0) {
                    throw Error(`Verifique o campo "${field}" no formulário.`);
                }
            });
        }

        if (medicalTreatment === 'sim') {
            if (
                typeof treatmentDescription !== 'string' ||
                treatmentDescription.length === 0
            ) {
                throw Error(
                    'Verifique o campo "descrição do tratamento" no formulário.'
                );
            }
        }
        if (allergy === 'sim') {
            if (
                typeof allergyDescription !== 'string' ||
                allergyDescription.length === 0
            ) {
                throw Error(
                    'Verifique o campo "descrição da alergia" no formulário.'
                );
            }
        }
        if (recentSurgery === 'sim') {
            if (
                typeof surgeryDescription !== 'string' ||
                surgeryDescription.length === 0
            ) {
                throw Error(
                    'Verifique o campo "descrição da cirurgia" no formulário.'
                );
            }
        }
        if (tumorOrCancer === 'sim') {
            if (
                typeof tumorOrCancerDescription !== 'string' ||
                tumorOrCancerDescription.length === 0
            ) {
                throw Error(
                    'Verifique o campo "descrição do tumor/câncer" no formulário.'
                );
            }
        }
        if (skinProblems === 'sim') {
            if (
                typeof skinProblemsDescription !== 'string' ||
                skinProblemsDescription.length === 0
            ) {
                throw Error(
                    'Verifique o campo "descrição do problema de pele" no formulário.'
                );
            }
        }
        if (orthopedicProblems === 'sim') {
            if (
                typeof orthopedicProblemsDescription !== 'string' ||
                orthopedicProblemsDescription.length === 0
            ) {
                throw Error(
                    'Verifique o campo "descrição do problema ortopédico" no formulário.'
                );
            }
        }
        if (prosthesis === 'sim') {
            if (
                typeof prosthesisDescription !== 'string' ||
                prosthesisDescription.length === 0
            ) {
                throw Error(
                    'Verifique o campo "descrição da prótese" no formulário.'
                );
            }
        }
        if (acuteInflammation === 'sim') {
            if (
                typeof inflammationDescription !== 'string' ||
                inflammationDescription.length === 0
            ) {
                throw Error(
                    'Verifique o campo "descrição da inflamação" no formulário.'
                );
            }
        }
        if (necessaryInformation === 'sim') {
            if (
                typeof informationDescription !== 'string' ||
                informationDescription.length === 0
            ) {
                throw Error(
                    'Verifique o campo "descrição da informação adicional" no formulário.'
                );
            }
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'INVALID_ADMIN_DATA_PARAMS',
            error.message ? error.message : error,
            'Dados enviados inválidos. Por favor verifique os campos preenchidos.'
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function verifyPatientId(req, resp, next) {
    const id = parseInt(req.body.patientId, 10);

    try {
        if (typeof id !== 'number' || id.length === 0) {
            throw Error(
                'Não foi possivel validar os dados enviados. Verifique o campo ID do paciente.'
            );
        }

        const patient = await Patient.findOne({ where: { id } });

        if (!patient) {
            throw Error(
                'Não foi possível reconhecer o paciente pelo ID informado.'
            );
        }

        req.body.patientGenre = patient.genre;
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'INVALID_PATIENT_ID_PARAM',
            error.message ? error.message : error,
            'Dados enviados inválidos. Por favor verifique o campo ID.'
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function verifyAlredyExist(req, resp, next) {
    try {
        const id = parseInt(req.body.patientId, 10);

        const anamnese = await Anamnese.findOne({ where: { patient_id: id } });

        if (anamnese) {
            throw Error('Paciente já possui uma anamnese registrada.');
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'PATIENT_ALREADY_HAVE_AN_ANAMNESE',
            error.message ? error.message : error,
            'O paciente já possui uma anamnese registrada.'
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function verifyIdParam(req, resp, next) {
    const id = parseInt(req.params.id, 10);

    try {
        if (typeof id !== 'number' || id.length === 0) {
            throw Error(
                'Não foi possivel validar o ID. Verifique o parâmetro ID na rota.'
            );
        }

        const anamnese = await Anamnese.findOne({ where: { id } });

        if (!anamnese) {
            throw Error(
                'Não foi possível encontrar a anamnese pelo ID informado.'
            );
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            'INVALID_ANAMNESE_ID_PARAM',
            error.message ? error.message : error,
            'Dados enviados inválidos. Por favor verifique o parâmetro ID.'
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

async function verifyNameQuery(req, resp, next) {
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

export {
    validateData,
    verifyPatientId,
    verifyIdParam,
    verifyNameQuery,
    verifyAlredyExist,
};
