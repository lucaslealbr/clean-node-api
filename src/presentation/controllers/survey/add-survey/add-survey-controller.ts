import {
  badRequest,
  noContent,
  serverError
} from '../../../helpers/http/http-helper'
import {
  AddSurvey,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const error = this.validation.validate(body)

      if (error) {
        return badRequest(error)
      }

      await this.addSurvey.add({ ...body })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
