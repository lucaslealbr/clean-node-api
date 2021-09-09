import { Validation } from '../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const validations: Validation[] = []
    const requiredFields = ['question', 'answers']

    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }

    makeAddSurveyValidation()
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
