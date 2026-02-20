import { describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "~/repositories/in-memory/in-memory-users-repository";
import { InMemoryCheckinsRepository } from "~/repositories/in-memory/in-memory-checkins-repository";
import { email } from "zod";
import { CheckinUseCase } from "./check-in";

describe("Check-in Use Case", () => {
  it("should be able to checkin", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const checkInRepository = new InMemoryCheckinsRepository();
    const checkInUseCase = new CheckinUseCase(checkInRepository);

    const user = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("123456", 6),
    });

    const checkIn = await checkInUseCase.execute({
      gymId: "gym-123",
      userId: user.id,
    });

    expect(checkIn).toMatchObject({
      checkin: {
        gym_id: "gym-123",
        user_id: user.id,
      },
    });
  });
});
