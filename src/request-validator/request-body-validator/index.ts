import R from 'ramda'
import { RequestBody, OpenAPI } from '../../interfaces'
import requireBodyPresent from './required-body-present'
import requestBodyContent from './request-body-content'

export default (
  req: any,
  requestBody: RequestBody,
  swaggerDoc: OpenAPI
): boolean =>
  requireBodyPresent(req, R.propOr(false, 'required')(requestBody)) &&
  requestBodyContent()
