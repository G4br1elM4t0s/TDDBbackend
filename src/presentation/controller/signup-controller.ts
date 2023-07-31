/* eslint-disable @typescript-eslint/no-unused-vars */

import { InvalidParamError } from "../erros/invalid-param-error"
import { MissingParamError } from "../erros/missing-param-error"
import { badRequest } from "../helpers/http-helper"
import { EmailValidator } from "../protocols/email-validator"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SignupController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ["email", "password", "name", "confirmPassword"]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { email, password, name, confirmPassword } = httpRequest.body
    if (password !== confirmPassword) {
      return badRequest(new InvalidParamError("passwordConfirmation"))
    }

    const isValid = this.emailValidator.isValid(email)
    if (!isValid) {
      return badRequest(new InvalidParamError("email"))
    }

    return {
      statusCode: 200,
      body: "ok",
    }
  }
}
