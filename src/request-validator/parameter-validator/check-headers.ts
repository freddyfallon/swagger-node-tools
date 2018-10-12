import { type } from 'ramda'
export default (headerParameters: any, requestHeaders: any) =>
  headerParameters
    ? headerParameters.reduce((validated: boolean, currentHeader: any) => {
        if (currentHeader.schema.type !== type(requestHeaders[currentHeader])) {
          return false
        }
      }, true)
    : true
