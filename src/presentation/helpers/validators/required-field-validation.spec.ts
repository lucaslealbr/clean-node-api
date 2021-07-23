import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('anyField')
    const error = sut.validate({ name: 'any_name' })

    expect(error).toEqual(new MissingParamError('anyField'))
  })

  test('Should not return if validation succeds', () => {
    const sut = new RequiredFieldValidation('anyField')
    const isValid = sut.validate({ anyField: 'any_value' })

    expect(isValid).toBeFalsy()
  })
})
