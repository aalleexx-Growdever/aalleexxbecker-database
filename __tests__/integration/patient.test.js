import request from "supertest";
import app from "../../src/app";
import Patient from "../../src/app/models/Patient";

describe("patients", () => {
    describe("post", () => {
        it("should register a patient with correct params", async () => {
            expect.assertions(3);

            const response = await request(app)
                .post("/patients")
                .send({
                    name: "Patient One",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            expect(response.status).toBe(201);
            expect(response.body.data.patient).toHaveProperty(
                "name",
                "Patient One"
            );
            expect(response.body.data.patient).toHaveProperty(
                "contact",
                "(51) 991919191"
            );
        });

        it("should register a patient with correct structure", async () => {
            expect.assertions(1);

            const patient = await Patient.create({
                name: "Patient Two",
                birthdate: new Date(1990, 11, 25),
                contact: "(51) 991919191",
                genre: "feminino",
                howMet: "Instagram",
            });

            expect(patient).toBeInstanceOf(Patient);
        });

        it("should not register a patient without correct params", async () => {
            expect.assertions(1);

            const response = await request(app)
                .post("/patients")
                .send({
                    // name: 'Patient One',
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            expect(response.status).toBe(400);
        });

        it("should not register a patient with blank params", async () => {
            expect.assertions(1);

            const response = await request(app)
                .post("/patients")
                .send({
                    name: "",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "",
                    howMet: "Instagram",
                });

            expect(response.status).toBe(400);
        });

        it("should not register a patient with invalid params types", async () => {
            expect.assertions(1);

            const response = await request(app).post("/patients").send({
                name: 123,
                birthdate: "new Date(1990, 11, 25)",
                contact: "(51) 991919191",
                genre: "feminino",
                howMet: "Instagram",
            });

            expect(response.status).toBe(400);
        });

        it("should register a patient and the recommender", async () => {
            expect.assertions(1);

            const patient = await request(app)
                .post("/patients")
                .send({
                    name: "Recommender",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "feminino",
                    howMet: "Instagram",
                });

            const { id } = patient.body.data.patient;

            const response = await request(app)
                .post("/patients")
                .send({
                    name: "Recommended",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "feminino",
                    howMet: "Recomendação",
                    recommenderId: id,
                });

            expect(response.status).toBe(201);
        });
    });

    describe("index", () => {
        it("should get all patients data", async () => {
            expect.assertions(1);

            const response = await request(app).get("/patients");

            expect(response.status).toBe(200);
        });

        it('should get all patients data through query param "name"', async () => {
            expect.assertions(1);

            await request(app)
                .post("/patients")
                .send({
                    name: "Patient Three",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const name = "Patient Three";

            const response = await request(app).get(`/patients?name=${name}`);

            expect(response.status).toBe(200);
        });

        it('should not get any patient data through query param "name" without an existing patient name', async () => {
            expect.assertions(1);

            await request(app)
                .post("/patients")
                .send({
                    name: "Patient Four",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const name = "Another Name";

            const response = await request(app).get(`/patients?name=${name}`);

            expect(response.status).toBe(400);
        });

        it('should not get any patient data through query param "name" without a valid name param', async () => {
            expect.assertions(1);

            await request(app)
                .post("/patients")
                .send({
                    name: "Patient Five",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const name = "nome123";

            const response = await request(app).get(`/patients?name=${name}`);

            expect(response.status).toBe(400);
        });
    });

    describe("show", () => {
        it("should get one specific patient data by ID param", async () => {
            expect.assertions(3);

            const patient = await request(app)
                .post("/patients")
                .send({
                    name: "Patient Six",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const { id } = patient.body.data.patient;

            const response = await request(app).get(`/patients/${id}`);

            expect(response.status).toBe(200);
            expect(response.body.data.patient).toHaveProperty(
                "name",
                "Patient Six"
            );
            expect(response.body.data.patient).toHaveProperty(
                "genre",
                "masculino"
            );
        });

        it("should not get one specific patient data if ID param does not exist at the database", async () => {
            expect.assertions(1);

            const response = await request(app).get("/patients/10000");

            expect(response.status).toBe(400);
        });

        it("should not get one specific patient data if ID param is not an integer type", async () => {
            expect.assertions(1);

            const response = await request(app).get("/patients/string");

            expect(response.status).toBe(400);
        });
    });

    describe("update", () => {
        it("should update a patient data with correct params", async () => {
            expect.assertions(1);

            const patient = await request(app)
                .post("/patients")
                .send({
                    name: "Patient Seven",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const { id } = patient.body.data.patient;

            const response = await request(app)
                .put(`/patients/${id}`)
                .send({
                    name: "New Patient Seven",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            expect(response.status).toBe(204);
        });

        it("should not update a patient data without correct params", async () => {
            expect.assertions(1);

            const patient = await request(app)
                .post("/patients")
                .send({
                    name: "Patient Eight",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const { id } = patient.body.data.patient;

            const response = await request(app)
                .put(`/patients/${id}`)
                .send({
                    // name: 'Patient Seven',
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            expect(response.status).toBe(400);
        });

        it("should not update a patient data with blank params", async () => {
            expect.assertions(1);

            const patient = await request(app)
                .post("/patients")
                .send({
                    name: "Patient Nine",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const { id } = patient.body.data.patient;

            const response = await request(app)
                .put(`/patients/${id}`)
                .send({
                    name: "",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "",
                });

            expect(response.status).toBe(400);
        });

        it("should not update a patient data with invalid params types", async () => {
            expect.assertions(1);

            const patient = await request(app)
                .post("/patients")
                .send({
                    name: "Patient Ten",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const { id } = patient.body.data.patient;

            const response = await request(app)
                .put(`/patients/${id}`)
                .send({
                    name: 123,
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: 2231,
                    howMet: "Facebook",
                });

            expect(response.status).toBe(400);
        });
    });

    describe("delete", () => {
        it("should delete one specific patient data by ID param", async () => {
            expect.assertions(1);

            const patient = await request(app)
                .post("/patients")
                .send({
                    name: "Patient Eleven",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const { id } = patient.body.data.patient;

            const response = await request(app).delete(`/patients/${id}`);

            expect(response.status).toBe(204);
        });

        it("should not delete one specific patient data if ID param does not exist at the database", async () => {
            expect.assertions(1);

            const response = await request(app).delete("/patients/10000");

            expect(response.status).toBe(400);
        });

        it("should not delete one specific patient data if ID param is not an integer type", async () => {
            expect.assertions(1);

            const response = await request(app).delete("/patients/string");

            expect(response.status).toBe(400);
        });
    });
});
