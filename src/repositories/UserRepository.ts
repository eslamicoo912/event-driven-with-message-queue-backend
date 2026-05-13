import { UserModel, type UserDocument } from "../models/User";

export interface CreateUserInput {
  email: string;
  name: string;
  passwordHash: string;
}

export class UserRepository {
  async create(input: CreateUserInput): Promise<UserDocument> {
    return UserModel.create(input);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }
}
