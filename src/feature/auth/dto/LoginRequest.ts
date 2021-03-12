export enum Provider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

export class LoginRequest {
  providerId: string
  provider: Provider
  email: string
  name: string
}
