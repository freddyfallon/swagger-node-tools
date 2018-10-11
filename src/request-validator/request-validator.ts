import { OpenAPI, PathItem } from '../interfaces'
import getRef from '../helpers/get-ref'

export default (
  swaggerDoc: OpenAPI,
  requestSchemaPossibleRef: any,
  method: string,
  req: any
): boolean => {
  // requestSchema either contains a reference or else the schema would be requestSchema[method]

  const requestSchema = requestSchemaPossibleRef.$ref
    ? getRef(swaggerDoc, requestSchemaPossibleRef.$ref)
    : requestSchemaPossibleRef[method]
  return true
}
