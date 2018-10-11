import { OpenAPI, PathItem } from '../interfaces'
import getRef from '../helpers/get-ref'
import parameterValidator from './parameter-validator'
import requestBodyValidator from './request-body-validator'

export default (
  swaggerDoc: OpenAPI,
  pathSchemaOrRef: any,
  method: string,
  req: any
): boolean => {
  // pathSchema either contains a reference or else the schema would be pathSchema[method]

  const pathSchema = pathSchemaOrRef.$ref
    ? getRef(swaggerDoc, pathSchemaOrRef.$ref)
    : pathSchemaOrRef

  const requestSchema = pathSchema[method]

  parameterValidator(req, requestSchema.parameters)
  requestBodyValidator(req, requestSchema.requestBody)
  return true
}
