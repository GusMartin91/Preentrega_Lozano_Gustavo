import { expect } from "chai";
import supertest from "supertest";
import { config } from "../src/config/envs.config.js";

const requester = supertest(`http://localhost:${config.PORT}/api`);

describe("Testeando productos", () => {
    const data = { title: "zapatillas", code: "asb123", stock: 100, price: 100 };
    let adminToken = "";
    let adminId = "";
    let pid = "";

    const adminData = {
        first_name: "Test",
        last_name: "Admin",
        email: "admin@test.com",
        password: "123456",
        role: "admin",
    };
    before(async () => {
        // Crear usuario admin
        const registerResponse = await requester.post("/sessions/register").send(adminData);
        adminId = registerResponse._body.payload.user._id;
        expect(registerResponse.statusCode).to.be.equals(201);
        // // Loguear al usuario admin
        const loginResponse = await requester.post("/sessions/login").send({
            email: adminData.email,
            password: adminData.password,
        });
        expect(loginResponse.statusCode).to.be.equals(200);
        adminToken = loginResponse._body.payload.accessToken;
    });
    it("Creando un producto", async () => {
        const response = await requester
            .post("/products")
            .set("Cookie", `UserCookie=${adminToken}`)
            .send(data);
        const { _body, statusCode } = response;
        pid = _body.payload.product._id;
        expect(statusCode).to.be.equals(201);
    });
    it("Leyendo productos", async () => {
        const response = await requester.get("/products/");
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
    });
    it("Leyendo un producto", async () => {
        const response = await requester.get("/products/" + pid);
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
    });
    it("Actualizando un producto", async () => {
        const response = await requester.put("/products/update/" + pid)
            .set("Cookie", `UserCookie=${adminToken}`)
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
    });
    it("Eliminando un producto", async () => {
        const response = await requester.delete("/products/delete/" + pid)
            .set("Cookie", `UserCookie=${adminToken}`)
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
    });
    after(async () => {
        // Eliminar el usuario admin
        const deleteResponse = await requester
            .delete(`/sessions/delete/${adminId}`)
            .set("Cookie", `UserCookie=${adminToken}`)
        expect(deleteResponse.statusCode).to.be.equals(200);
    });
});