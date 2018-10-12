import { OpenAPI, RequestBody } from '../../interfaces'
import mediaTypeMatches from './media-type-matches'

export default (
  req: any,
  requestBody: RequestBody,
  swaggerDoc: OpenAPI
): boolean => mediaTypeMatches(req, requestBody)
