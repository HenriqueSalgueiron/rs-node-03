import { InMemoryUsersRepository } from "~/repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "../register";

export function MakeRegisterUseCase() {
  const usersRepository = new InMemoryUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
