import { filter, propEq, compose, find } from 'ramda'
import { Parameter, OpenAPI } from '../../interfaces'
import checkHeaders from './check-headers'
export default (
  req: any,
  parameters: [Parameter],
  swaggerDoc: OpenAPI
): any => {
  if (parameters) {
    const headerParams = find(propEq('in', 'header'))(parameters)
      ? filter(propEq('in', 'header'))(parameters)
      : undefined

    const checkParams = compose(checkHeaders)
    return checkParams(headerParams, req.headers, swaggerDoc)
  }
  return true
}
