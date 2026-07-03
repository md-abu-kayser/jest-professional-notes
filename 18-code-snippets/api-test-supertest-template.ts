import request from "supertest";
import app from "../app";
import { Server } from "http";

let server: Server;

beforeAll((done) => {
  server = app.listen(0, () => {
    const address = server.address() as { port: number };
    process.env.TEST_SERVER_PORT = String(address.port);
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("GET /api/health", () => {
  it("returns 200 and a status message", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: "ok" });
  });
});

describe("POST /api/users", () => {
  it("creates a user and returns 201", async () => {
    const newUser = { name: "Jane" };
    const response = await request(app)
      .post("/api/users")
      .send(newUser)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
