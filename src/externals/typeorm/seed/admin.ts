import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

createConnection()
  .then(async (connection) => {
    const id = uuidV4();
    const password = await hash("admin", 10);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
      values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', '123asd456', true, 'now()')`
    );

    await connection.close();
  })
  .then(() => {
    console.log("User admin created");
  });
