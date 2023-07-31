import { InvalidParamError } from "../erros/invalid-param-error"
import { MissingParamError } from "../erros/missing-param-error"
import { EmailValidator } from "../protocols/email-validator"
import { SignupController } from "./signup-controller"

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    // test duble
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: SignupController
  emailValidatorStub: EmailValidator
}

//factories
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignupController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub,
  }
}

describe("Signup Controller", () => {
  test("must ensure that the email is filled", async () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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

  test("should return an error because the passwords are different", async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: "johndoe@gmail.com",
        name: "John Doe",
        password: "123",
        confirmPassword: "1234",
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation"),
    )
  })

  test("should return error 400 if the email entered is not valid", async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: "johndoe@gmail.com",
        name: "John Doe",
        password: "123",
        confirmPassword: "123",
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError("email"))
  })
})
