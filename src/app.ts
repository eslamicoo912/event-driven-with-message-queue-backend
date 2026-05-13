import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { apiRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";

export function createApp() {
  const app = express();

  // Security and parsing middleware are configured centrally for predictable request behavior.
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN }));
  app.use(express.json({ limit: "1mb" }));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100
    })
  );

  app.get("/health", (_request, response) => {
    response.status(200).json({
      status: "ok",
      environment: env.NODE_ENV
    });
  });

  app.use("/api", apiRoutes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
