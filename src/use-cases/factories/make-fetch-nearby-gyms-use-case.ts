import { PrismaCheckInsRepository } from "~/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "~/repositories/prisma/prisma-gyms-repository";

export function MakeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
