import { ArmMediumUrl } from '../../../urls/arm/medium/medium.url'

export class MediumRequestService {
  constructor() {}

  picture(id: string) {
    return ArmMediumUrl.picture(id)
  }
}
