import { AnalyticsRepository } from "./repositories/AnalyticsRepository";
import { ImageRepository } from "./repositories/ImageRepository";
import { NotificationRepository } from "./repositories/NotificationRepository";
import { UserRepository } from "./repositories/UserRepository";
import { AnalyticsService } from "./services/AnalyticsService";
import { AuthService } from "./services/AuthService";
import { EmailQueueProducer } from "./queues/producers/EmailQueueProducer";
import { FileProcessingService } from "./services/FileProcessingService";
import { ImageService } from "./services/ImageService";
import { NotificationService } from "./services/NotificationService";
import { AnalyticsController } from "./controllers/AnalyticsController";
import { AuthController } from "./controllers/AuthController";
import { ImageController } from "./controllers/ImageController";
import { NotificationController } from "./controllers/NotificationController";
import { NotificationQueueProducer } from "./queues/producers/NotificationQueueProducer";
import { AnalyticsQueueProducer } from "./queues/producers/AnalyticsQueueProducer";
import { FileProcessingQueueProducer } from "./queues/producers/FileProcessingQueueProducer";

// The container is the app's composition root. Swapping implementations stays localized here.
const userRepository = new UserRepository();
const imageRepository = new ImageRepository();
const notificationRepository = new NotificationRepository();
const analyticsRepository = new AnalyticsRepository();

const emailQueueProducer = new EmailQueueProducer();
const notificationProducer = new NotificationQueueProducer();
const analyticsProducer = new AnalyticsQueueProducer();
const fileProcessingProducer = new FileProcessingQueueProducer()

const analyticsService = new AnalyticsService(analyticsRepository);
const notificationService = new NotificationService(notificationRepository);
const fileProcessingService = new FileProcessingService(imageRepository);
const authService = new AuthService(userRepository, emailQueueProducer, analyticsProducer);
const imageService = new ImageService(imageRepository, fileProcessingProducer, notificationProducer, analyticsProducer);

export const container = {
  controllers: {
    authController: new AuthController(authService),
    imageController: new ImageController(imageService),
    notificationController: new NotificationController(notificationService),
    analyticsController: new AnalyticsController(analyticsService)
  },
  services: {
    analyticsService,
    notificationService,
    fileProcessingService,
    authService,
    imageService
  }
};
