import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase, RegisterUseCaseRequest } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "~/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { MakeRegisterUseCase } from "./factories/make-register-use-case";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const registerUseCase = MakeRegisterUseCase();
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    };

    const { user } = await registerUseCase.execute(data);
    expect(user).toMatchObject({
      name: data.name,
      email: data.email,
    });
  });

  it("should not be able to register with same email twice", async () => {
    const registerUseCase = MakeRegisterUseCase();
    const data: RegisterUseCaseRequest = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    };

    await registerUseCase.execute(data);

    expect(async () => {
      await registerUseCase.execute(data);
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should hash user password upon registration", async () => {
    const registerUseCase = MakeRegisterUseCase();
    const data = {
      name: "John Doe",
      email: "john22.doe@example.com",
      password: "123456",
    };

    const { user } = await registerUseCase.execute(data);

    const isPasswordCorrectlyHashed = await compare(
      data.password,
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
