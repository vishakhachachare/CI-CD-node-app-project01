const request = require("supertest");
const app = require("../app");

describe("Basic endpoints", () => {
  test("GET / returns message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Hello from CI\/CD/);
  });

  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
