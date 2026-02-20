import { CheckIn, Prisma } from "generated/prisma/client";

export interface ICheckinsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
