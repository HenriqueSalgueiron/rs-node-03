import { CheckIn, Prisma } from "generated/prisma/client";

export interface ICheckinsRepository {
  // findById(id: string): Promise<CheckIn | null>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
