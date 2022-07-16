import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'
import { makeDbLoadAccountByToken } from '@/main/factories/use-cases'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
