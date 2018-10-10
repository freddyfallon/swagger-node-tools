import { all, keysIn, startsWith } from 'ramda'
import { OpenAPI } from '../interfaces'
export default (openApiDoc: OpenAPI): boolean =>
  all(startsWith('/'), keysIn(openApiDoc.paths))