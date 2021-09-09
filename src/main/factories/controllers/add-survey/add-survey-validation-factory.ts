import { Validation } from '../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['question', 'answers']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
