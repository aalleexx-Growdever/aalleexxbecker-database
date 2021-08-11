import request from "supertest";
import app from "../../src/app";
import Admin from "../../src/app/models/Admin";

describe("admins", () => {
    describe("post", () => {
        it("should create a new admin with correct params", async () => {
            expect.assertions(3);

            const response = await request(app).post("/admins").send({
                name: "Admin 1",
                login: "admin login 3",
                password: "password1",
            });

            expect(response.status).toBe(201);
            expect(response.body.data.admin).toHaveProperty("name", "Admin 1");
            expect(response.body.data.admin).toHaveProperty(
                "login",
                "admin login 3"
            );
        });

        it("should create a new admin with correct structure", async () => {
            expect.assertions(1);

            const admin = await Admin.create({
                name: "Admin 2",
                login: "admin login 2",
                password: "password2",
            });

            expect(admin).toBeInstanceOf(Admin);
        });

        it("should not create a new admin without correct params", async () => {
            expect.assertions(1);

            const response = await request(app).post("/admins").send({
                name: "Admin 3",
                // login: 'admin login 3',
                password: "password3",
            });

            expect(response.status).toBe(400);
        });

        it("should not create a new admin with blank params", async () => {
            expect.assertions(1);

            const response = await request(app).post("/admins").send({
                name: "",
                login: "",
                password: "",
            });

            expect(response.status).toBe(400);
        });

        it("should not create a new admin with invalid params types", async () => {
            expect.assertions(1);

            const response = await request(app).post("/admins").send({
                name: 1231,
                login: true,
                password: 11,
            });

            expect(response.status).toBe(400);
        });
    });

    describe("index", () => {
        it("should get all admins data", async () => {
            expect.assertions(1);

            const response = await request(app).get("/admins");

            expect(response.status).toBe(200);
        });

        it('should get all admins data through query param "name"', async () => {
            expect.assertions(1);

            await request(app).post("/admins").send({
                name: "Alex Becker",
                login: "alex admin",
                password: "password1",
            });

            const name = "Alex Becker";

            const response = await request(app).get(`/admins?name=${name}`);

            expect(response.status).toBe(200);
        });

        it('should not get any admins data through query param "name" without an existing admin name', async () => {
            expect.assertions(1);

            await request(app).post("/admins").send({
                name: "Alexsandro Becker",
                login: "alexsandro admin",
                password: "password1",
            });

            const name = "Bruna Kersten";

            const response = await request(app).get(`/admins?name=${name}`);

            expect(response.status).toBe(400);
        });

        it('should not get any admins data through query param "name" without a valid name param', async () => {
            expect.assertions(1);

            await request(app).post("/admins").send({
                name: "Bruna Kersten",
                login: "Bruna Kersten admin",
                password: "password1",
            });

            const name = "nome123";

            const response = await request(app).get(`/admins?name=${name}`);

            expect(response.status).toBe(400);
        });
    });

    describe("show", () => {
        it("should get one specific admin data by ID param", async () => {
            expect.assertions(3);

            const admin = await request(app).post("/admins").send({
                name: "Admin show",
                login: "admin login show",
                password: "passwordshow",
            });

            const { id } = admin.body.data.admin;

            const response = await request(app).get(`/admins/${id}`);

            expect(response.status).toBe(200);
            expect(response.body.data.admin).toHaveProperty(
                "name",
                "Admin show"
            );
            expect(response.body.data.admin).toHaveProperty(
                "login",
                "admin login show"
            );
        });

        it("should not get one specific admin data if ID param does not exist at the database", async () => {
            expect.assertions(1);

            const response = await request(app).get("/admins/10000");

            expect(response.status).toBe(400);
        });

        it("should not get one specific admin data if ID param is not an integer type", async () => {
            expect.assertions(1);

            const response = await request(app).get("/admins/string");

            expect(response.status).toBe(400);
        });
    });

    describe("update", () => {
        it("should update an admin data with correct params", async () => {
            expect.assertions(1);

            const admin = await request(app).post("/admins").send({
                name: "Admin update 1",
                login: "update 1",
                password: "update1",
            });

            const { id } = admin.body.data.admin;

            const response = await request(app).put(`/admins/${id}`).send({
                name: "New Admin update 1",
                login: "new update 1",
                password: "updatenew",
            });

            expect(response.status).toBe(204);
        });

        it("should not update an admin data without correct params", async () => {
            expect.assertions(1);

            const admin = await request(app).post("/admins").send({
                name: "update 3",
                login: "update 3",
                password: "passwordupdate3",
            });

            const { id } = admin.body.data.admin;

            const response = await request(app).put(`/admins/${id}`).send({
                name: "update 3 new",
                // login: 'update 3 new',
                password: "passwordupdate3new",
            });

            expect(response.status).toBe(400);
        });

        it("should not update an admin data with blank params", async () => {
            expect.assertions(1);

            const admin = await request(app).post("/admins").send({
                name: "update 4",
                login: "update 4",
                password: "passwordupdate4",
            });

            const { id } = admin.body.data.admin;

            const response = await request(app).put(`/admins/${id}`).send({
                name: "",
                login: "",
                password: "",
            });

            expect(response.status).toBe(400);
        });

        it("should not update an admin data with invalid params types", async () => {
            expect.assertions(1);

            const admin = await request(app).post("/admins").send({
                name: "update 5",
                login: "update 5",
                password: "passwordupdate5",
            });

            const { id } = admin.body.data.admin;

            const response = await request(app).put(`/admins/${id}`).send({
                name: 1231,
                login: true,
                password: 11,
            });

            expect(response.status).toBe(400);
        });
    });

    describe("delete", () => {
        it("should delete one specific admin data by ID param", async () => {
            expect.assertions(1);

            const admin = await request(app).post("/admins").send({
                name: "Admin delete 1",
                login: "admin delete 1",
                password: "passworddelete1",
            });

            const { id } = admin.body.data.admin;

            const response = await request(app).delete(`/admins/${id}`);

            expect(response.status).toBe(204);
        });

        it("should not delete the admin data if ID param does not exist at the database", async () => {
            expect.assertions(1);

            const response = await request(app).delete("/admins/10000");

            expect(response.status).toBe(400);
        });

        it("should not delete the admin data if ID param is not an integer type", async () => {
            expect.assertions(1);

            const response = await request(app).delete("/admins/string");

            expect(response.status).toBe(400);
        });
    });
});
