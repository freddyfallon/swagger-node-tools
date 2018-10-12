import { filter, propEq, compose, find } from 'ramda'
import { Parameter } from '../../interfaces'
import checkHeaders from './check-headers'
export default (req: any, parameters: [Parameter]): any => {
  if (parameters) {
    const headerParams = find(propEq('in', 'header'))(parameters)
      ? filter(propEq('in', 'header'))(parameters)
      : undefined

    const checkParams = compose(checkHeaders)
    return checkParams(headerParams, req.headers)
  }
  return true
}
