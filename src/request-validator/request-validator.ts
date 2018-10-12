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

  if (
    parameterValidator(req, requestSchema.parameters, swaggerDoc) &&
    requestBodyValidator(req, requestSchema.requestBody, swaggerDoc)
  ) {
    return true
  } else return false
}
