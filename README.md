# Queue-Ready Backend API

A simple production-structured backend API using Node.js, Express, TypeScript, MongoDB, and a Redis-ready configuration surface.

This project intentionally does **not** implement BullMQ, workers, cron jobs, background jobs, or any message queue library. The service layer is shaped so you can later move email sending, analytics tracking, notification dispatching, and file processing into queues yourself.

## Folder Structure

```text
src/
  app.ts
  server.ts
  config/
  controllers/
  database/
  infrastructure/
  middlewares/
  models/
  repositories/
  routes/
  services/
  types/
  utils/
  validation/
```

## Example APIs

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/images` with `Authorization: Bearer <token>` and multipart field `image`
- `GET /api/notifications` with `Authorization: Bearer <token>`
- `POST /api/analytics/events` with `Authorization: Bearer <token>`

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

MongoDB must be available at `MONGO_URI`.

## Queue Integration Learning Points

The following service methods are intentionally isolated and asynchronous:

- `EmailService.sendWelcomeEmail`
- `NotificationService.createNotification`
- `AnalyticsService.trackEvent`
- `FileProcessingService.processUploadedImage`

Later, those methods are natural places to enqueue BullMQ jobs from request-time code or move work into dedicated workers.
