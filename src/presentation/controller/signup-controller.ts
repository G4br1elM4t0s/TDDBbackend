/* eslint-disable @typescript-eslint/no-unused-vars */

import { MissingParamError } from "../erros/missing-param-error"
import { badRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SignupController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, name, password, confirmPassword } = httpRequest.body
    if (!email) {
      return badRequest(new MissingParamError("email"))
    }

    if (!name) {
      return badRequest(new MissingParamError("name"))
    }

    if (!password) {
      return badRequest(new MissingParamError("password"))
    }

    if (!confirmPassword) {
      return badRequest(new MissingParamError("confirmPassword"))
    }

    return {
      statusCode: 200,
      body: "ok",
    }
  }
}
