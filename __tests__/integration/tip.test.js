import request from 'supertest';
import app from '../../src/app';

describe('tips', () => {
    jest.setTimeout(60000);

    describe('store', () => {
        it('should register a new tip with correct params', async () => {
            expect.assertions(3);

            const response = await request(app).post('/tips').send({
                subject: 'Assunto 1',
                text: 'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(201);
            expect(response.body.data.tip).toHaveProperty(
                'subject',
                'Assunto 1'
            );
            expect(response.body.data.tip).toHaveProperty(
                'text',
                'Algo relativo ao assunto 1, pois o ideal será esse.'
            );
        });

        it('should not register a new tip without correct type of params', async () => {
            expect.assertions(1);

            const response = await request(app).post('/tips').send({
                subject: 123,
                text: 'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not register a new tip with blank params', async () => {
            expect.assertions(1);

            const response = await request(app).post('/tips').send({
                subject: ' ',
                text: 'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not register a new tip with missing params', async () => {
            expect.assertions(1);

            const response = await request(app).post('/tips').send({
                // subject: '',
                text: 'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });
    });

    describe('index', () => {
        it('should get all tips data', async () => {
            expect.assertions(1);

            const response = await request(app).get('/tips');

            expect(response.status).toBe(200);
        });

        it('should get all tips data related to the "subject" query param', async () => {
            expect.assertions(1);

            const subject = 'Assunto 1';

            const response = await request(app).get(`/tips?subject=${subject}`);

            expect(response.status).toBe(200);
        });

        it('should not get any tips data related to an invalid "subject" query param', async () => {
            expect.assertions(1);

            const subject = 'nonexistent';

            const response = await request(app).get(`/tips?subject=${subject}`);

            expect(response.status).toBe(400);
        });

        it('should not get any tips data related to an invalid type of "subject" query param', async () => {
            expect.assertions(1);

            const subject = 123;

            const response = await request(app).get(`/tips?subject=${subject}`);

            expect(response.status).toBe(400);
        });
    });

    describe('show', () => {
        it('should get one specific tip by ID param', async () => {
            expect.assertions(1);

            const response = await request(app).get('/tips/1');

            expect(response.status).toBe(200);
        });

        it('should not get any data related to an invalid ID param', async () => {
            expect.assertions(1);

            const response = await request(app).get('/tips/asdsd');

            expect(response.status).toBe(400);
        });

        it('should not get any data related to an nonexistent ID param', async () => {
            expect.assertions(1);

            const response = await request(app).get('/tips/1000');

            expect(response.status).toBe(400);
        });
    });

    describe('update', () => {
        it('should update one specific tip by ID param', async () => {
            expect.assertions(1);

            const response = await request(app).put('/tips/1').send({
                subject: 'Novo Assunto 1',
                text: 'Algo relativo ao novo assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(204);
        });

        it('should not update any data related to an invalid ID param', async () => {
            expect.assertions(1);

            const response = await request(app).put('/tips/asdsd').send({
                subject: 'Novo Assunto 1',
                text: 'Algo relativo ao novo assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not update any data related to an nonexistent ID param', async () => {
            expect.assertions(1);

            const response = await request(app).put('/tips/1000').send({
                subject: 'Novo Assunto 1',
                text: 'Algo relativo ao novo assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not update a tip with missing params', async () => {
            expect.assertions(1);

            const response = await request(app).put('/tips/1').send({
                // subject: '',
                text: 'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not update a tip with blank params', async () => {
            expect.assertions(1);

            const response = await request(app).put('/tips/1').send({
                subject: ' ',
                text: 'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });
    });

    describe('delete', () => {
        it('should delete one specific tip by ID param', async () => {
            expect.assertions(1);

            const response = await request(app).delete('/tips/1');

            expect(response.status).toBe(204);
        });

        it('should not delete any data related to an invalid ID param', async () => {
            expect.assertions(1);

            const response = await request(app).delete('/tips/asdsd');

            expect(response.status).toBe(400);
        });

        it('should not delete any data related to an nonexistent ID param', async () => {
            expect.assertions(1);

            const response = await request(app).delete('/tips/1000');

            expect(response.status).toBe(400);
        });
    });
});
