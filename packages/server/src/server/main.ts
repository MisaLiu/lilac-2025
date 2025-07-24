import express from "express";
import ViteExpress from "vite-express";
import Routes from './routes/index.js';
import db from './database.js';

const app = express();

// Apply default Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply API routes
app.use('/api', Routes);

// Initialize the whole server
(async () => {

await db.authenticate();
for (const name in db.models) {
  console.log(name);
  await db.models[name].sync();
}
console.log('Database initialized!');

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);

})();
