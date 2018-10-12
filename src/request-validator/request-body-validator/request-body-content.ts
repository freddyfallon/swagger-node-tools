import { OpenAPI, RequestBody, Schema } from '../../interfaces'
import mediaTypeMatches from './media-type-matches'
import bodyMatchesSchema from './body-matches-schema'
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
    const content = readMapOrObject(
      requestBody.content,
      req.headers['content-type']
    )

    return bodyMatchesSchema(req, content.schema)
  }

  return false
}
