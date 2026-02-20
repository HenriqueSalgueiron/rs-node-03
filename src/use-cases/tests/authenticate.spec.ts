import { describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { MakeAuthenticateUseCase } from "../factories/make-authenticate-use-case";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const { authenticateUseCase, usersRepository } = MakeAuthenticateUseCase();

    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "john.doe@example.com",
      password: "123456",
    });

    expect(user).toMatchObject({
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  it("should not be able to authenticate with wrong email", async () => {
    const { authenticateUseCase } = MakeAuthenticateUseCase();

    expect(() =>
      authenticateUseCase.execute({
        email: "wrong@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const { authenticateUseCase, usersRepository } = MakeAuthenticateUseCase();

    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      authenticateUseCase.execute({
        email: "john.doe@example.com",
        password: "wrong-password",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
