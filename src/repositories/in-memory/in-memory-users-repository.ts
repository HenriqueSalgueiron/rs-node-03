import { User } from "generated/prisma/client";
import { UserCreateInput } from "generated/prisma/models";
import { IUsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async create(data: UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    };
    this.items.push(user);

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
