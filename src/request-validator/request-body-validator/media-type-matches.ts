import { OpenAPI, RequestBody } from '../../interfaces'

export default (contentType: any = '', requestBody: RequestBody): boolean => {
  let contentMap = requestBody.content

  if (!(requestBody.content instanceof Map)) {
    contentMap = new Map(Object.entries(requestBody.content || {}))
  }

  return contentMap.has(contentType)
}
