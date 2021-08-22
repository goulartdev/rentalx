import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import createConnection from "@externals/typeorm";
import app from "@server/app";

let connection: Connection;

const email = "admin@rentalx.com.br";
const password = "admin";

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const passwordHash = await hash(password, 10);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
      values('${id}', 'admin', '${email}', '${passwordHash}', '123asd456', true, 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const authResponse = await request(app).post("/authenticate").send({
      email,
      password,
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Test 1",
        description: "category test 1 description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category if name already exists", async () => {
    const responseToken = await request(app).post("/authenticate").send({
      email,
      password,
    });

    const { refreshToken } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Test 1",
        description: "category test 1 description",
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    expect(response.status).toBe(400);
  });
});
