import { AddAccount, Authentication } from '@/domain/use-cases'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, Validation, HttpResponse } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = request

      const isValid = await this.addAccount.add({
        name,
        password,
        email
      })

      if (!isValid) {
        return forbidden(new EmailInUseError())
      }

      const authenticationModel = await this.authentication.auth({ email, password })

      return ok({ accessToken: authenticationModel.accessToken, name: authenticationModel.name })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    email: string
    name: string
    passwordConfirmation: string
    password: string
  }
}
