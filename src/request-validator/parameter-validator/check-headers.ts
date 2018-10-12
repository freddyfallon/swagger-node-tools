import { map, type, filter, propEq, keysIn, contains } from 'ramda'
import getRef from '../../helpers/get-ref'
import { OpenAPI } from '../../interfaces'

export default (
  headerParameters: any,
  requestHeaders: any,
  swaggerDoc: OpenAPI
) => {
  const requiredFields = filter(
    item => propEq('required', true, item),
    headerParameters
  )

  requiredFields.map((item: any) => {
    if (!contains(item.name, keysIn(requestHeaders))) {
      throw new Error(`${item.name} required`)
    }
  })

  return headerParameters
    ? headerParameters.reduce((result: any, currentHeader: any) => {
        if (
          type(requestHeaders) === 'Object' &&
          !requestHeaders[currentHeader.name]
        ) {
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
