import {
  Controller,
  HttpRequest,
  HttpResponse,
  ok,
  Validation
} from './add-survey-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    this.validation.validate(body)
    return await Promise.resolve(ok(''))
  }
}
