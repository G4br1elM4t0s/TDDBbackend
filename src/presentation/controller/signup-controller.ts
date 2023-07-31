/* eslint-disable @typescript-eslint/no-unused-vars */

import { MissingParamError } from "../erros/missing-param-error"
import { badRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SignupController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ["email", "password", "name", "confirmPassword"]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: "ok",
    }
  }
}
