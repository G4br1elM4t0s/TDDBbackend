import { MissingParamError } from "../erros/missing-param-error"
import { SignupController } from "./signup-controller"

describe("Signup Controller", () => {
  test("must ensure that the email is filled", async () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        name: "John Doe",
        password: "123",
        confirmPassword: "123",
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("email"))
  })

  test("must ensure that the name is filled", async () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        email: "johndoe@gmail.com",
        password: "123",
        confirmPassword: "123",
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("name"))
  })

  test("must ensure that the password is filled", async () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        email: "johndoe@gmail.com",
        name: "John Doe",
        confirmPassword: "123",
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("password"))
  })

  test("must ensure that the confirmPassword is filled", async () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        email: "johndoe@gmail.com",
        name: "John Doe",
        password: "123",
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("confirmPassword"))
  })
})
