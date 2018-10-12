import { type } from 'ramda'
import getRef from '../../helpers/get-ref'
import { OpenAPI } from '../../interfaces'

export default (
  headerParameters: any,
  requestHeaders: any,
  swaggerDoc: OpenAPI
) => {
  return headerParameters
    ? headerParameters.reduce((result: any, currentHeader: any) => {
        if (!requestHeaders[currentHeader.name]) {
          return true
        }
        if (currentHeader.schema.$ref) {
          const schema: any = getRef(swaggerDoc, currentHeader.schema.$ref)
          if (
            schema.type !==
            type(requestHeaders[currentHeader.name]).toLowerCase()
          ) {
            throwErrorForWrongType(
              type(requestHeaders[currentHeader.name]),
              currentHeader.name,
              schema.type
            )
          }
        } else if (
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
    : true
}

const throwErrorForWrongType = (
  typeFound: string,
  propertyName: string,
  expectedType: string
) => {
  throw new Error(
    `Found type of ${typeFound.toLowerCase()} for ${propertyName}, expected ${expectedType}`
  )
}
