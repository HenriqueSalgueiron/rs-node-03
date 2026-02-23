import { PrismaCheckInsRepository } from "~/repositories/prisma/prisma-check-ins-repository";
import { CheckinUseCase } from "../check-in";
import { PrismaGymsRepository } from "~/repositories/prisma/prisma-gyms-repository";

export function MakeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsrepository = new PrismaGymsRepository();
  const useCase = new CheckinUseCase(checkInsRepository, gymsrepository);

  return useCase;
}
