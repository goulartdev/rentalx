import env from "@config/env";

import app from "./app";

app.listen(env.api.port, () => console.log(`Server is running on port ${env.api.port}...`));
