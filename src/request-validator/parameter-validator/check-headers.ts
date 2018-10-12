import { type, filter, propEq } from 'ramda'
import getRef from '../../helpers/get-ref'
import { throwErrorForWrongType, checkRequiredFields } from './helpers'
import { OpenAPI } from '../../interfaces'

export default (
  headerParameters: any,
  requestHeaders: any,
  swaggerDoc: OpenAPI
) => {
  checkRequiredFields(requestHeaders, headerParameters)

  if (headerParameters) {
    headerParameters.reduce((result: any, currentHeader: any) => {
      if (
        type(requestHeaders) === 'Object' &&
        !requestHeaders[currentHeader.name]
      ) {
        return true
      }
      if (currentHeader.schema.$ref) {
        const schema: any = getRef(swaggerDoc, currentHeader.schema.$ref)
        if (
          schema.type !== type(requestHeaders[currentHeader.name]).toLowerCase()
        ) {
          throwErrorForWrongType(
            type(requestHeaders[currentHeader.name]),
            currentHeader.name,
            schema.type
          )
        }
      } else if (
        type(requestHeaders) === 'Object' &&
        currentHeader.schema.type !==
          type(requestHeaders[currentHeader.name]).toLowerCase()
      ) {
        throwErrorForWrongType(
          type(requestHeaders[currentHeader.name]),
          currentHeader.name,
          currentHeader.schema.type
        )
      }
      return result
    }, true)
    return true
  }
}
