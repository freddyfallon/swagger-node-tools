import R from 'ramda'
import { RequestBody, OpenAPI } from '../../interfaces'
import requireBodyPresent from './required-body-present'
import requestBodyContent from './request-body-content'

export default (
  req: any,
  requestBody: RequestBody,
  swaggerDoc: OpenAPI
): boolean => {
  const bodyIsRequired: boolean = R.propOr(false, 'required')(requestBody)

  return (
    requireBodyPresent(req, bodyIsRequired) &&
    requestBodyContent(req, requestBody, swaggerDoc)
  )
}
