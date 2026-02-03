import { User } from "generated/prisma/browser";
import { Prisma } from "generated/prisma/client";
import { prisma } from "~/lib/prisma";
import { IUsersRepository } from "../users-repository";

// Métodos que vão interagir com o banco de dados.

// Esse pattern é interessante pois se um dia quisermos parar de usar Prisma, ou alterar
//  o banco de dados, ou até mesmo usar múltiplos bancos, apenas o código de /repositories precisa
//  ser alterado. os use-cases/services continuam iguais. ou seja, estamos desacoplando o prisma do
//  funcionamento "core" dos casos de uso da aplicação.

export class PrismaUsersRepository implements IUsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
