import { IUsersRepository } from "~/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn, User } from "generated/prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { ICheckinsRepository } from "~/repositories/check-ins-repository";

interface CheckinUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckinUseCaseResponse {
  checkin: CheckIn;
}

export class CheckinUseCase {
  constructor(private checkinsRepository: ICheckinsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkin = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkin };
  }
}
