import request from 'supertest';
import app from '../../src/app';

describe('anamneses', () => {
    jest.setTimeout(500000000);

    describe('post', () => {
        it('should register as anamnese with correct man params', async () => {
            expect.assertions(3);

            const patient = await request(app)
                .post('/patients')
                .send({
                    name: 'Paciente Um',
                    birthdate: new Date(1990, 11, 25),
                    contact: '(51) 991919191',
                    genre: 'masculino',
                    howMet: 'Facebook',
                });

            const { id } = patient.body.data.patient;

            const response = await request(app).post('/anamneses').send({
                patientId: id,
                smoker: 'não',
                circulatoryDisorder: 'não',
                workout: 'Pouco',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'sim',
                allergyDescription: 'Rinite alérgica.',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Um.',
            });

            expect(response.status).toBe(201);
            expect(response.body.data.anamnese).toHaveProperty(
                'workout',
                'Pouco'
            );
            expect(response.body.data.anamnese).toHaveProperty(
                'information_description',
                'Essa anamnese pertence à: Paciente Um.'
            );
        });
        it('should not register as anamnese without mandatory params', async () => {
            expect.assertions(1);

            const patient = await request(app)
                .post('/patients')
                .send({
                    name: 'Paciente Dois',
                    birthdate: new Date(1990, 11, 25),
                    contact: '(51) 991919191',
                    genre: 'masculino',
                    howMet: 'Facebook',
                });

            const { id } = patient.body.data.patient;

            const response = await request(app).post('/anamneses').send({
                patientId: id,
                // smoker: 'não',
                circulatoryDisorder: 'não',
                workout: 'Pouco',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                // varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'sim',
                allergyDescription: 'Rinite alérgica.',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Dois.',
            });

            expect(response.status).toBe(400);
        });
        it('should register an anamnese with correct woman params', async () => {
            expect.assertions(3);

            const patient = await request(app)
                .post('/patients')
                .send({
                    name: 'Paciente Três',
                    birthdate: new Date(1990, 11, 25),
                    contact: '(51) 991919191',
                    genre: 'feminino',
                    howMet: 'Facebook',
                });

            const { id } = patient.body.data.patient;

            const response = await request(app).post('/anamneses').send({
                patientId: id,
                regularMenstrualCicle: 'sim',
                pregnant: 'não',
                hormonaldisorder: 'não',
                smoker: 'não',
                circulatoryDisorder: 'não',
                workout: 'Pouco',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'sim',
                allergyDescription: 'Rinite alérgica.',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Três.',
            });

            expect(response.status).toBe(201);
            expect(response.body.data.anamnese).toHaveProperty(
                'pregnant',
                'não'
            );
            expect(response.body.data.anamnese).toHaveProperty(
                'regular_menstrual_cicle',
                'sim'
            );
        });
        it('should not register a woman anamnese without correct woman mandatory params', async () => {
            expect.assertions(1);

            const patient = await request(app)
                .post('/patients')
                .send({
                    name: 'Paciente Quatro',
                    birthdate: new Date(1990, 11, 25),
                    contact: '(51) 991919191',
                    genre: 'feminino',
                    howMet: 'Facebook',
                });

            const { id } = patient.body.data.patient;

            const response = await request(app).post('/anamneses').send({
                patientId: id,
                regularMenstrualCicle: 'sim',
                // pregnant: 'não',
                hormonaldisorder: 'não',
                smoker: 'não',
                circulatoryDisorder: 'não',
                workout: 'Pouco',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'sim',
                allergyDescription: 'Rinite alérgica.',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Quatro.',
            });

            expect(response.status).toBe(400);
        });
        it('should not register an anamnese without a valid patient ID params', async () => {
            expect.assertions(1);

            const response = await request(app).post('/anamneses').send({
                patientId: 'asudh',
                regularMenstrualCicle: 'sim',
                pregnant: 'não',
                hormonaldisorder: 'não',
                smoker: 'não',
                circulatoryDisorder: 'não',
                workout: 'Pouco',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'sim',
                allergyDescription: 'Rinite alérgica.',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Quatro.',
            });

            expect(response.status).toBe(400);
        });
        it('should not register an anamnese without an existing patient ID params', async () => {
            expect.assertions(1);

            const response = await request(app).post('/anamneses').send({
                patientId: 15,
                regularMenstrualCicle: 'sim',
                pregnant: 'não',
                hormonaldisorder: 'não',
                smoker: 'não',
                circulatoryDisorder: 'não',
                workout: 'Pouco',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'sim',
                allergyDescription: 'Rinite alérgica.',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Quatro.',
            });

            expect(response.status).toBe(400);
        });
    });

    describe('index', () => {
        it('should get all anamneses data', async () => {
            expect.assertions(1);

            const response = await request(app).get('/anamneses');

            expect(response.status).toBe(200);
        });

        it('should get all anamneses data through the patient name as query param "name"', async () => {
            expect.assertions(1);

            const name = 'Paciente Um';

            const response = await request(app).get(`/anamneses?name=${name}`);

            expect(response.status).toBe(200);
        });

        it('should not get any anamnese data through query param "name" without an existing patient name', async () => {
            expect.assertions(1);

            const name = 'Another Name';

            const response = await request(app).get(`/anamneses?name=${name}`);

            expect(response.status).toBe(400);
        });

        it('should not get any anamnese data through query param "name" without a valid name param', async () => {
            expect.assertions(1);

            const name = 'nome123';

            const response = await request(app).get(`/anamneses?name=${name}`);

            expect(response.status).toBe(400);
        });
    });

    describe('show', () => {
        it('should get one specific anamnese data by ID param', async () => {
            expect.assertions(3);

            const response = await request(app).get('/anamneses/1');

            expect(response.status).toBe(200);
            expect(response.body.data.anamnese).toHaveProperty(
                'information_description',
                'Essa anamnese pertence à: Paciente Um.'
            );
            expect(response.body.data.anamnese).toHaveProperty(
                'allergy_description',
                'Rinite alérgica.'
            );
        });

        it('should not get one specific anamnese data if ID param does not exist at the database', async () => {
            expect.assertions(1);

            const response = await request(app).get('/anamneses/10000');

            expect(response.status).toBe(400);
        });

        it('should not get one specific anamnese data if ID param is not an integer type', async () => {
            expect.assertions(1);

            const response = await request(app).get('/anamneses/string');

            expect(response.status).toBe(400);
        });
    });

    describe('update', () => {
        it('should update an anamnese data with correct params', async () => {
            expect.assertions(1);

            const response = await request(app).put(`/anamneses/1`).send({
                patientId: 1,
                smoker: 'não',
                circulatoryDisorder: 'não',
                workout: 'Frequentemente',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'não',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Um.',
            });

            console.log('============== response: ', response.body);

            expect(response.status).toBe(204);
        });

        it('should not update an anamnese data without correct params', async () => {
            expect.assertions(1);

            const response = await request(app).put(`/anamneses/1`).send({
                patientId: 1,
                smoker: 123123,
                circulatoryDisorder: 'não',
                workout: 'Frequentemente',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'não',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Um.',
            });

            expect(response.status).toBe(400);
        });

        it('should not update an anamnese data with blank params', async () => {
            expect.assertions(1);

            const response = await request(app).put(`/anamneses/1`).send({
                patientId: 1,
                smoker: '',
                circulatoryDisorder: 'não',
                workout: '',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'não',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Um.',
            });

            expect(response.status).toBe(400);
        });

        it('should not update an anamnese data with an invalid patient ID type', async () => {
            expect.assertions(1);

            const response = await request(app).put(`/anamneses/1`).send({
                patientId: 'string',
                smoker: 'não',
                circulatoryDisorder: 'não',
                workout: 'Frequentemente',
                diabetes: 'não',
                heartProblems: 'não',
                bloodPressure: 'não',
                pacemaker: 'não',
                varicoseVeinsOrThrombosis: 'não',
                medicalTreatment: 'não',
                allergy: 'não',
                recentSurgery: 'não',
                tumorOrCancer: 'não',
                skinProblems: 'não',
                orthopedicProblems: 'não',
                prosthesis: 'não',
                acuteInflammation: 'não',
                necessaryInformation: 'sim',
                informationDescription:
                    'Essa anamnese pertence à: Paciente Um.',
            });

            expect(response.status).toBe(400);
        });
    });

    describe('delete', () => {
        it('should delete one specific anamnese data by ID param', async () => {
            expect.assertions(1);

            const response = await request(app).delete('/anamneses/1');

            expect(response.status).toBe(204);
        });

        it('should not delete one specific anamnese data if ID param does not exist at the database', async () => {
            expect.assertions(1);

            const response = await request(app).delete('/anamneses/10000');

            expect(response.status).toBe(400);
        });

        it('should not delete one specific anamnese data if ID param is not an integer type', async () => {
            expect.assertions(1);

            const response = await request(app).delete('/anamneses/string');

            expect(response.status).toBe(400);
        });
    });
});
