import { port, app } from "./app.js";
import { DbConnect as connect } from "./utils/Db.js";

connect();

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
