import Patient from "../models/Patient";
import ApiResult from "../utils/ApiResult";

class PatientController {
    async index(req, resp) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const { conditions } = await Patient.parseConditions(req.query);

            const { count, rows } = await Patient.findAndCountAll({
                where: conditions,
                limit,
                offset: (page - 1) * limit,
            });

            const data = {
                current_page: parseInt(page, 10),
                total_pages: Math.ceil(count / limit),
                total: count,
                patients: rows,
            };

            const response = ApiResult.parseResult(
                true,
                { data },
                "Pacientes retornados(as) com sucesso."
            );

            return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                "Não foram encontrados dados para serem listados."
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }

    async show(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);

            const patient = await Patient.findByPk(id);

            if (!patient) {
                throw Error("Não foi possível buscar o(a) paciente pelo ID.");
            }

            const response = ApiResult.parseResult(
                true,
                { patient },
                "Paciente retornado com sucesso."
            );

            return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                "Não foi possível buscar o(a) paciente pelo ID."
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }

    async store(req, resp) {
        try {
            const { name, birthdate, contact, genre, howMet, recommenderId } =
                req.body;

            const patient = await Patient.create({
                name,
                birthdate,
                contact,
                genre,
                how_met: howMet,
                recommender_id: recommenderId,
            });

            const response = ApiResult.parseResult(
                true,
                { patient },
                "Paciente cadastrado com sucesso."
            );

            return resp.status(ApiResult.OK_CREATED).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                "Não foi possível cadastrar o paciente."
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }

    async update(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, birthdate, contact, genre, howMet } = req.body;

            const updated = await Patient.update(
                {
                    name,
                    birthdate,
                    contact,
                    genre,
                    how_met: howMet,
                },
                {
                    where: { id },
                }
            );

            if (!updated) {
                throw Error(
                    "Não foi possível atualizar os dados do(a) paciente."
                );
            }

            const response = ApiResult.parseResult(
                true,
                "PATIENT_UPDATED",
                "Dados do(a) paciente atualizados com sucesso."
            );

            return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                "Erro ao atualizar os dados do(a) paciente."
            );

            return resp.status(ApiResult.BAD_REQUEST).json(response);
        }
    }

    async delete(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);

            const patient = await Patient.findByPk(id);

            if (!patient) {
                throw Error(
                    "Não foi possível encontrar os dados do(a) paciente pelo ID."
                );
            }

            await Patient.destroy({ where: { id } });

            const response = ApiResult.parseResult(
                true,
                "PATIENT_DATA_DELETED",
                "Dados do(a) paciente deletados com sucesso."
            );

            return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                "Erro ao deletar os dados do(a) paciente."
            );

            return resp.status(ApiResult.BAD_REQUEST).json(response);
        }
    }
}

export default new PatientController();
