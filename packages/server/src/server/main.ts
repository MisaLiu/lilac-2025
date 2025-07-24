import express from "express";
import ViteExpress from "vite-express";
import db from './database.js';

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

// Initialize the whole server
(async () => {

await db.authenticate();
for (const name in db.models) {
  await db.models[name].sync();
}
console.log('Database initialized!');

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);

})();
