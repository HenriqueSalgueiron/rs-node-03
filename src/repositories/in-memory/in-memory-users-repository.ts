import { User } from "generated/prisma/client";
import { UserCreateInput } from "generated/prisma/models";
import { IUsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async create(data: UserCreateInput) {
    const user = {
      id: "user-id",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    };
    this.items.push(user);

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
