import mediaTypeMatches from './media-type-matches'
import minimalSwagger from '../../minimal-swagger'

const applicationJSON = 'application/json'
const content = new Map()
content.set(applicationJSON, {})
const req = {
  headers: {
    'content-type': applicationJSON
  }
}
const requestBody = {
  content
}

describe('mediaTypeMatches', () => {
  test('when requestBody.content has a matching MediaType for the req', () => {
    mediaTypeMatches(req, requestBody)
  })
  test('when requestBody.content has no matching MediaType for the req', () => {
    const misMatchedMediaTypeReq = {
      headers: {
        'content-type': 'text/html'
      }
    }
    mediaTypeMatches(misMatchedMediaTypeReq, requestBody)
  })
})
