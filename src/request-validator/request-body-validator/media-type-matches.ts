import { OpenAPI, RequestBody } from '../../interfaces'

export default (req: any, requestBody: RequestBody): boolean => {
  let contentMap = requestBody.content
  const reqMediaType = req.headers['content-type']

  if (!(requestBody.content instanceof Map)) {
    contentMap = new Map(Object.entries(requestBody.content || {}))
  }

  return contentMap.has(reqMediaType)
}
