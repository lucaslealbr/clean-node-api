import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../protocols/email-validator'
import { Validation } from '../../presentation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly emailFieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | undefined {
    const isValid = this.emailValidator.isValid(input[this.emailFieldName])

    if (!isValid) {
      return new InvalidParamError(this.emailFieldName)
    }
  }
}
