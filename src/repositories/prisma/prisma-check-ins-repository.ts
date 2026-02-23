import { CheckIn } from "generated/prisma/client";
import { CheckInUncheckedCreateInput } from "generated/prisma/models";
import { ICheckinsRepository } from "../check-ins-repository";
import { prisma } from "~/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements ICheckinsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });
    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf("date");
    const endOfdate = dayjs(date).endOf("date");

    const checkInOnSameDate = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay.toDate(),
          lte: endOfdate.toDate(),
        },
      },
    });

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    return checkIn;
  }
}
