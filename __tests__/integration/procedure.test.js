import request from 'supertest';
import app from '../../src/app';

describe('procedures', () => {
    jest.setTimeout(60000);

    describe('store', () => {
        it('should register a new procedure with correct params', async () => {
            expect.assertions(3);

            const response = await request(app).post('/procedures').send({
                name: 'Procedimento 1',
                description:
                    'Algo relativo ao Procedimento 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(201);
            expect(response.body.data.procedure).toHaveProperty(
                'name',
                'Procedimento 1'
            );
            expect(response.body.data.procedure).toHaveProperty(
                'description',
                'Algo relativo ao Procedimento 1, pois o ideal será esse.'
            );
        });

        it('should not register a new procedure without correct type of params', async () => {
            expect.assertions(1);

            const response = await request(app).post('/procedures').send({
                name: 123,
                description:
                    'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not register a new procedure with blank params', async () => {
            expect.assertions(1);

            const response = await request(app).post('/procedures').send({
                name: ' ',
                description:
                    'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not register a new procedure with missing params', async () => {
            expect.assertions(1);

            const response = await request(app).post('/procedures').send({
                // name: '',
                description:
                    'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });
    });

    describe('index', () => {
        it('should get all procedures data', async () => {
            expect.assertions(1);

            const response = await request(app).get('/procedures');

            expect(response.status).toBe(200);
        });

        it('should get all procedures data related to the "name" query param', async () => {
            expect.assertions(1);

            const name = 'Procedimento 1';

            const response = await request(app).get(`/procedures?name=${name}`);

            expect(response.status).toBe(200);
        });

        it('should not get any procedures data related to an invalid "name" query param', async () => {
            expect.assertions(1);

            const name = 'nonexistent';

            const response = await request(app).get(`/procedures?name=${name}`);

            expect(response.status).toBe(400);
        });

        it('should not get any procedures data related to an invalid type of "name" query param', async () => {
            expect.assertions(1);

            const name = 123;

            const response = await request(app).get(`/procedures?name=${name}`);

            expect(response.status).toBe(400);
        });
    });

    describe('show', () => {
        it('should get one specific procedure by ID param', async () => {
            expect.assertions(1);

            const response = await request(app).get('/procedures/1');

            expect(response.status).toBe(200);
        });

        it('should not get any data related to an invalid ID param', async () => {
            expect.assertions(1);

            const response = await request(app).get('/procedures/asdsd');

            expect(response.status).toBe(400);
        });

        it('should not get any data related to an nonexistent ID param', async () => {
            expect.assertions(1);

            const response = await request(app).get('/procedures/1000');

            expect(response.status).toBe(400);
        });
    });

    describe('update', () => {
        it('should update one specific procedure by ID param', async () => {
            expect.assertions(1);

            const response = await request(app).put('/procedures/1').send({
                name: 'Novo Assunto 1',
                description:
                    'Algo relativo ao novo assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(204);
        });

        it('should not update any data related to an invalid ID param', async () => {
            expect.assertions(1);

            const response = await request(app).put('/procedures/asdsd').send({
                name: 'Novo Assunto 1',
                description:
                    'Algo relativo ao novo assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not update any data related to an nonexistent ID param', async () => {
            expect.assertions(1);

            const response = await request(app).put('/procedures/1000').send({
                name: 'Novo Assunto 1',
                description:
                    'Algo relativo ao novo assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not update a procedure with missing params', async () => {
            expect.assertions(1);

            const response = await request(app).put('/procedures/1').send({
                // name: '',
                description:
                    'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });

        it('should not update a procedure with blank params', async () => {
            expect.assertions(1);

            const response = await request(app).put('/procedures/1').send({
                name: ' ',
                description:
                    'Algo relativo ao assunto 1, pois o ideal será esse.',
            });

            expect(response.status).toBe(400);
        });
    });

    describe('delete', () => {
        it('should delete one specific procedure by ID param', async () => {
            expect.assertions(1);

            const response = await request(app).delete('/procedures/1');

            expect(response.status).toBe(204);
        });

        it('should not delete any data related to an invalid ID param', async () => {
            expect.assertions(1);

            const response = await request(app).delete('/procedures/asdsd');

            expect(response.status).toBe(400);
        });

        it('should not delete any data related to an nonexistent ID param', async () => {
            expect.assertions(1);

            const response = await request(app).delete('/procedures/1000');

            expect(response.status).toBe(400);
        });
    });
});
