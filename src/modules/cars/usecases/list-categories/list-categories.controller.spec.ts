import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import createConnection from "@externals/typeorm";
import app from "@server/app";

let connection: Connection;

const email = "admin@rentalx.com.br";
const password = "admin";

describe("List Categories Controller", () => {
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

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/authenticate").send({
      email,
      password,
    });

    const { refreshToken } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Test 1",
        description: "category test 1 description",
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    await request(app)
      .post("/categories")
      .send({
        name: "Category Test 2",
        description: "category test 2 description",
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe("Category Test 1");
    expect(response.body[1].name).toBe("Category Test 2");
  });
});
