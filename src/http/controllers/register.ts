import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { prisma } from "~/lib/prisma";
import { hash } from "bcryptjs";
import { RegisterUseCase } from "~/use-cases/register";
import { PrismaUsersRepository } from "~/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "~/use-cases/errors/user-already-exists";

// esse arquivo é responsável por receber a requisição HTTP, chamar o
//  caso de uso e retornar a resposta HTTP

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository(); //pode trocar por outro repositorio
    const registerUseCase = new RegisterUseCase(usersRepository); // injetando a dependencia

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    return reply.status(500).send(); // TODO fix me
  }

  return reply.status(201).send();
}
