import Patient from "../models/Patient";
import ApiResult from "../utils/ApiResult";

async function validateRecommenderId(req, resp, next) {
    const id = parseInt(req.params.id, 10);
    try {
        if (id.length === 0) {
            throw Error(
                "Parâmetro ID obrigatório para requisição não informado."
            );
        }
        if (!Number.isInteger(id)) {
            throw Error("Parâmetro ID deve ser um número inteiro.");
        }

        const patient = await Patient.findOne({
            where: { id },
        });

        if (!patient) {
            throw Error(
                "Não foi possível encontrar o(a) recomendador(a) com o ID informado."
            );
        }

        const recommender = await Patient.findOne({
            where: { recommender_id: id },
        });

        if (!recommender) {
            throw Error(
                "Não existem dados de recomendador(a) com o ID informado."
            );
        }
    } catch (error) {
        const response = ApiResult.parseError(
            false,
            "RECOMMENDER_DATA_NOT_FOUND",
            error.message ? error.message : error,
            Error
        );

        return resp.status(ApiResult.BAD_REQUEST).json(response);
    }

    return next();
}

export default validateRecommenderId;
