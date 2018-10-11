import { OpenAPI } from '../interfaces'
import validate from './request-validator'
import getRef from '../helpers/get-ref'

import R from 'ramda'

export default (document: OpenAPI) => {
  return (req: any, res: any, next: Function): void => {
    const definedReqPath = document.paths[req.path]
    if (!definedReqPath) {
      return res
        .status(400)
        .send(`${req.path} not found in swagger defined paths`)
    }

    if (definedReqPath.$ref && !getRef(document, definedReqPath.$ref)) {
      // console.log('🤡', '$ref used but not found')
      return res.status(400).send(`${req.method} not valid for ${req.path}`)
    }

    if (
      definedReqPath.$ref &&
      getRef(document, definedReqPath.$ref) &&
      !R.has(req.method.toLowerCase(), getRef(document, definedReqPath.$ref))
    ) {
      // console.log(
      //   '🤡',
      //   `$ref used, found, but does not contain ${req.method} method`
      // )
      return res.status(400).send(`${req.method} not valid for ${req.path}`)
    }

    if (
      !R.has(req.method.toLowerCase(), definedReqPath) &&
      !definedReqPath.$ref
    ) {
      // console.log('🤡', `no $ref used, ${req.method} method not allowed`)
      return res.status(400).send(`${req.method} not valid for ${req.path}`)
    }

    const requestIsValid = validate(
      document,
      definedReqPath,
      req.method.toLowerCase(),
      req
    )

    next()
  }
}
