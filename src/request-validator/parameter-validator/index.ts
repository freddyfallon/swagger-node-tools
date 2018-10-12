import { filter, propEq, type, compose, find } from 'ramda'
import { Parameter } from '../../interfaces'
export default (req: any, parameters: [Parameter]): any => {
  if (parameters) {
    const headerParams = find(propEq('in', 'header'))(parameters)
      ? filter(propEq('in', 'header'))(parameters)
      : null
    const checkHeaders = () =>
      headerParams
        ? headerParams.reduce((validated: boolean, currentHeader: any) => {
            if (
              currentHeader.schema.type !== type(req.headers[currentHeader])
            ) {
              return false
            }
          }, true)
        : true
    const result = compose(checkHeaders)
    return result()
  }
  return true
}
