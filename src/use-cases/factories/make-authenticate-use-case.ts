import { InMemoryUsersRepository } from "~/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function MakeAuthenticateUseCase() {
  const usersRepository = new InMemoryUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
