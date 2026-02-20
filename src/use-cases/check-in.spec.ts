import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "~/repositories/in-memory/in-memory-users-repository";
import { InMemoryCheckinsRepository } from "~/repositories/in-memory/in-memory-checkins-repository";
import { email } from "zod";
import { CheckinUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckinsRepository;
let sut: CheckinUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckinsRepository();
    sut = new CheckinUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkin } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkin.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkin } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkin.id).toEqual(expect.any(String));
  });
});
