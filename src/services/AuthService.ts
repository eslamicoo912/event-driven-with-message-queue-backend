import bcrypt from "bcryptjs";
import { AppError } from "../utils/AppError";
import { signAuthToken } from "../utils/jwt";
import { UserRepository } from "../repositories/UserRepository";
import type { PublicUser } from "../types/user";
import { EmailQueueProducer } from "../queues/producers/EmailQueueProducer";
import { AnalyticsQueueProducer } from "../queues/producers/AnalyticsQueueProducer";

export interface RegisterCommand {
  email: string;
  name: string;
  password: string;
}

export interface LoginCommand {
  email: string;
  password: string;
}

export interface AuthResult {
  user: PublicUser;
  token: string;
}

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailProducer: EmailQueueProducer,
    private readonly analyticsProducer: AnalyticsQueueProducer
  ) { }

  async register(command: RegisterCommand): Promise<AuthResult> {
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new AppError("Email is already registered", 409);
    }

    const passwordHash = await bcrypt.hash(command.password, 12);
    const user = await this.userRepository.create({
      email: command.email,
      name: command.name,
      passwordHash
    });

    const publicUser = toPublicUser(user);

    // These side effects are isolated so they can later become queued jobs without changing controller code.
    await this.emailProducer.enqueueWelcomeEmail({
      email: publicUser.email,
      name: publicUser.name,
      userId: publicUser.id
    })
    await this.analyticsProducer.enqueueTrackAnalyticsJob({
      userId: publicUser.id,
      eventName: "user_registered",
      properties: { email: publicUser.email }
    });

    return {
      user: publicUser,
      token: signAuthToken({ id: publicUser.id, email: publicUser.email })
    };
  }

  async login(command: LoginCommand): Promise<AuthResult> {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new AppError("Invalid email", 401);
    }

    const passwordMatches = await bcrypt.compare(command.password, user.passwordHash);
    if (!passwordMatches) {
      throw new AppError("Invalid password", 401);
    }

    const publicUser = toPublicUser(user);

    await this.analyticsProducer.enqueueTrackAnalyticsJob({
      userId: publicUser.id,
      eventName: "user_logged_in"
    });

    return {
      user: publicUser,
      token: signAuthToken({ id: publicUser.id, email: publicUser.email })
    };
  }
}

function toPublicUser(user: {
  _id: { toString(): string };
  email: string;
  name: string;
  createdAt: Date;
}): PublicUser {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    createdAt: user.createdAt
  };
}
