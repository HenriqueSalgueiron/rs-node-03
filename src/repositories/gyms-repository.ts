import { Gym, Prisma } from "generated/prisma/client";

export interface IGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
}
