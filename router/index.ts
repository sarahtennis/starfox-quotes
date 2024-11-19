import { Express } from "express";

import CharactersRouter from "./charactersRouter";

export class AppRouter {
  constructor() {}

  static initRoutes(app: Express) {
    // Test endpoint
    app.get("/", (request, response) => {
      response.json({ info: "Node.js, Express, and Postgres API" });
    });
    // Characters
    app.use("/characters", CharactersRouter);
  }
}
