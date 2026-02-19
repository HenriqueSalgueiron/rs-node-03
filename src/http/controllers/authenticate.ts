import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "~/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "~/use-cases/authenticate";
import { InvalidCredentialsError } from "~/use-cases/errors/invalid-credentials-error";
import { MakeAuthenticateUseCase } from "~/use-cases/factories/make-authenticate-use-case";

// esse arquivo é responsável por receber a requisição HTTP, chamar o
//  caso de uso e retornar a resposta HTTP

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = MakeAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send();
}
