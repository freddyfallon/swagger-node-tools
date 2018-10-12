import { OpenAPI, RequestBody } from '../../interfaces'
import mediaTypeMatches from './media-type-matches'
import readMapOrObject from '../../helpers/read-map-or-object'

export default (
  req: any = {},
  requestBody: RequestBody,
  swaggerDoc: OpenAPI
): boolean => {
  if (!req.body) {
    return !requestBody.required
  }

  if (mediaTypeMatches(req, requestBody)) {
    readMapOrObject(requestBody.content, req.headers['content-type'])
    return true
  }

  return false
}
