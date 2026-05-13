import { ConsoleEmailProvider } from "./infrastructure/email/ConsoleEmailProvider";
import { AnalyticsRepository } from "./repositories/AnalyticsRepository";
import { ImageRepository } from "./repositories/ImageRepository";
import { NotificationRepository } from "./repositories/NotificationRepository";
import { UserRepository } from "./repositories/UserRepository";
import { AnalyticsService } from "./services/AnalyticsService";
import { AuthService } from "./services/AuthService";
import { EmailService } from "./services/EmailService";
import { FileProcessingService } from "./services/FileProcessingService";
import { ImageService } from "./services/ImageService";
import { NotificationService } from "./services/NotificationService";
import { AnalyticsController } from "./controllers/AnalyticsController";
import { AuthController } from "./controllers/AuthController";
import { ImageController } from "./controllers/ImageController";
import { NotificationController } from "./controllers/NotificationController";

// The container is the app's composition root. Swapping implementations stays localized here.
const userRepository = new UserRepository();
const imageRepository = new ImageRepository();
const notificationRepository = new NotificationRepository();
const analyticsRepository = new AnalyticsRepository();

const emailProvider = new ConsoleEmailProvider();

const emailService = new EmailService(emailProvider);
const analyticsService = new AnalyticsService(analyticsRepository);
const notificationService = new NotificationService(notificationRepository);
const fileProcessingService = new FileProcessingService(imageRepository);
const authService = new AuthService(userRepository, emailService, analyticsService);
const imageService = new ImageService(
  imageRepository,
  fileProcessingService,
  notificationService,
  analyticsService
);

export const container = {
  controllers: {
    authController: new AuthController(authService),
    imageController: new ImageController(imageService),
    notificationController: new NotificationController(notificationService),
    analyticsController: new AnalyticsController(analyticsService)
  },
  services: {
    emailService,
    analyticsService,
    notificationService,
    fileProcessingService,
    authService,
    imageService
  }
};
