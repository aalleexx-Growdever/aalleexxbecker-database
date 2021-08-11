import ApiResult from '../utils/ApiResult';
import Anamnese from '../models/Anamnese';
import Patient from '../models/Patient';

class AnamneseController {
    async index(req, resp) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const { conditions } = await Anamnese.parseConditions(req.query);

            const { count, rows } = await Anamnese.findAndCountAll({
                include: [
                    {
                        model: Patient,
                        as: 'patient',
                        where: conditions,
                    },
                ],
                limit,
                offset: (page - 1) * limit,
            });

            const data = {
                current_page: parseInt(page, 10),
                total_pages: Math.ceil(count / limit),
                total: count,
                anamneses: rows,
            };

            const response = ApiResult.parseResult(
                true,
                { data },
                'Anamnese(s) retornada(s) com sucesso.'
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
            const { id } = req.params;

            const anamnese = await Anamnese.findOne({
                where: { id },
            });

            const response = ApiResult.parseResult(
                true,
                { anamnese },
                'Anamnese retornada com sucesso.'
            );

            return resp.status(ApiResult.OK_WITH_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Não foi possível buscar a anamnese pelo ID.'
            );

            return resp.status(ApiResult.NOT_FOUND).json(response);
        }
    }

    async store(req, resp) {
        const id = parseInt(req.body.patientId, 10);
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

        try {
            const anamnese = await Anamnese.create({
                patient_id: id,
                smoker,
                circulatory_disorder: circulatoryDisorder,
                workout,
                regular_menstrual_cicle: regularMenstrualCicle,
                diabetes,
                heart_problems: heartProblems,
                hormonal_disorder: hormonaldisorder,
                blood_pressure: bloodPressure,
                pacemaker,
                varicose_veins_or_thrombosis: varicoseVeinsOrThrombosis,
                pregnant,
                medical_treatment: medicalTreatment,
                treatment_description: treatmentDescription,
                allergy,
                allergy_description: allergyDescription,
                recent_surgery: recentSurgery,
                surgery_description: surgeryDescription,
                tumor_or_cancer: tumorOrCancer,
                tumor_or_cancer_description: tumorOrCancerDescription,
                skin_problems: skinProblems,
                skin_problems_description: skinProblemsDescription,
                orthopedic_problems: orthopedicProblems,
                orthopedic_problems_description: orthopedicProblemsDescription,
                prosthesis,
                prosthesis_description: prosthesisDescription,
                acute_inflammation: acuteInflammation,
                inflammation_description: inflammationDescription,
                necessary_information: necessaryInformation,
                information_description: informationDescription,
            });

            const response = ApiResult.parseResult(
                true,
                { anamnese },
                'Anamnese cadastrada com sucesso.'
            );

            return resp.status(ApiResult.OK_CREATED).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Não foi possível cadastrar a anamnese.'
            );

            return resp.status(ApiResult.BAD_REQUEST).json(response);
        }
    }

    async update(req, resp) {
        try {
            const { id } = req.params;
            const patientId = parseInt(req.body.patientId, 10);
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

            const updated = await Anamnese.update(
                {
                    patient_id: patientId,
                    smoker,
                    circulatory_disorder: circulatoryDisorder,
                    workout,
                    regular_menstrual_cicle: regularMenstrualCicle,
                    diabetes,
                    heart_problems: heartProblems,
                    hormonal_disorder: hormonaldisorder,
                    blood_pressure: bloodPressure,
                    pacemaker,
                    varicose_veins_or_thrombosis: varicoseVeinsOrThrombosis,
                    pregnant,
                    medical_treatment: medicalTreatment,
                    treatment_description: treatmentDescription,
                    allergy,
                    allergy_description: allergyDescription,
                    recent_surgery: recentSurgery,
                    surgery_description: surgeryDescription,
                    tumor_or_cancer: tumorOrCancer,
                    tumor_or_cancer_description: tumorOrCancerDescription,
                    skin_problems: skinProblems,
                    skin_problems_description: skinProblemsDescription,
                    orthopedic_problems: orthopedicProblems,
                    orthopedic_problems_description:
                        orthopedicProblemsDescription,
                    prosthesis,
                    prosthesis_description: prosthesisDescription,
                    acute_inflammation: acuteInflammation,
                    inflammation_description: inflammationDescription,
                    necessary_information: necessaryInformation,
                    information_description: informationDescription,
                },
                {
                    where: { id },
                }
            );

            if (!updated) {
                throw Error('Não foi possível atualizar os dados da anamnese.');
            }

            const response = ApiResult.parseResult(
                true,
                'ANAMNESE_UPDATED',
                'Anamnese atualizada com sucesso.'
            );

            return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                error.message ? error.message : error,
                'Erro ao atualizar a anamnese.'
            );

            return resp.status(ApiResult.BAD_REQUEST).json(response);
        }
    }

    async delete(req, resp) {
        try {
            const id = parseInt(req.params.id, 10);

            const anamnese = await Anamnese.findOne({ where: { id } });

            if (!anamnese) {
                throw Error('Não foi possível encontrar a anamnese pelo id.');
            }

            await anamnese.destroy();

            const response = ApiResult.parseResult(
                true,
                'ANAMNESE_DELETED',
                'Anamnese deletada com sucesso.'
            );

            return resp.status(ApiResult.OK_WITHOUT_CONTENT).json(response);
        } catch (error) {
            const response = ApiResult.parseError(
                false,
                'ANAMNESE_DELETE_ERROR',
                error.message ? error.message : error,
                'Não foi possível deletar a anamnese.'
            );

            return resp.status(ApiResult.BAD_REQUEST).json(response);
        }
    }
}

export default new AnamneseController();
