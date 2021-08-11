import request from "supertest";
import app from "../../src/app";

describe("recommenders", () => {
    describe("index", () => {
        jest.setTimeout(20000);

        it("should get all patient data related to recommenders", async () => {
            expect.assertions(1);

            const patient1 = await request(app)
                .post("/patients")
                .send({
                    name: "Patient One",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Facebook",
                });

            const id1 = patient1.body.data.patient.id;

            const patient2 = await request(app)
                .post("/patients")
                .send({
                    name: "Patient Two",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Recomendação",
                    recommenderId: id1,
                });

            const id2 = patient2.body.data.patient.id;

            await request(app)
                .post("/patients")
                .send({
                    name: "Patient Three",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Recomendação",
                    recommenderId: id2,
                });

            await request(app)
                .post("/patients")
                .send({
                    name: "Patient Four",
                    birthdate: new Date(1990, 11, 25),
                    contact: "(51) 991919191",
                    genre: "masculino",
                    howMet: "Recomendação",
                    recommenderId: id2,
                });

            const response = await request(app).get("/recommenders");

            expect(response.status).toBe(200);
        });
    });

    describe("show", () => {
        it("should get all patient data related to a recommender ID param", async () => {
            expect.assertions(1);

            const response = await request(app).get("/recommenders/2");

            expect(response.status).toBe(200);
        });

        it("should not get any patient data related to an invalid recommender ID param", async () => {
            expect.assertions(1);

            const response = await request(app).get("/recommenders/asdsd");

            expect(response.status).toBe(400);
        });

        it("should not get any patient data related to an nonexistent recommender ID param", async () => {
            expect.assertions(1);

            const response = await request(app).get("/recommenders/1000");

            expect(response.status).toBe(400);
        });
    });
});
