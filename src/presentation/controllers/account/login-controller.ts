import { Authentication } from '@/domain/use-cases'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers'
import { Controller, Validation, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { email, password } = request

      const authenticationModel = await this.authentication.auth({ email, password })

      if (!authenticationModel) {
        return unauthorized()
      }

      return ok({ accessToken: authenticationModel.accessToken, name: authenticationModel.name })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
