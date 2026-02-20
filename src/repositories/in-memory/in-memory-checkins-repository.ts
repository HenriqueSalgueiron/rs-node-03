import { CheckIn, Prisma } from "generated/prisma/client";
import { ICheckinsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckinsRepository implements ICheckinsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = checkIn.created_at;
      return (
        checkIn.user_id === userId &&
        checkInDate >= startOfDay &&
        checkInDate <= endOfDay
      );
    });

    return checkInOnSameDate ?? null;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
