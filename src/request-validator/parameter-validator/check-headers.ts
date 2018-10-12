import { type } from 'ramda'
export default (headerParameters: any, requestHeaders: any) =>
  headerParameters
    ? headerParameters.reduce((result: any, currentHeader: any) => {
        if (
          currentHeader.schema.type !==
          type(requestHeaders[currentHeader.name]).toLowerCase()
        ) {
          throw `Found type of ${type(
            requestHeaders[currentHeader.name]
          ).toLowerCase()} for ${currentHeader.name}, expected ${
            currentHeader.schema.type
          }`
        }
        return result
      }, true)
    : true
