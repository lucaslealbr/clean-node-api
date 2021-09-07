import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('anyField')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })

    expect(error).toEqual(new MissingParamError('anyField'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const isValid = sut.validate({ anyField: 'any_value' })

    expect(isValid).toBeFalsy()
  })
})
