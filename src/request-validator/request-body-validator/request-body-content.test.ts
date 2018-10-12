jest.mock('./media-type-matches')
import requestBodyContent from './request-body-content'
import mediaTypeMatches from './media-type-matches'
import minimalSwagger from '../../minimal-swagger'
import { json } from 'body-parser'

const applicationJSON = 'application/json'
const content = new Map()
content.set(applicationJSON, {})
const requestBody = {
  content
}
const req = {
  headers: {
    'content-type': applicationJSON
  }
}

describe('requestBodyContent', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when requestBodyContent is called', () => {
    test('it should call mediaTypeMatches', () => {
      expect(mediaTypeMatches).not.toHaveBeenCalled()
      requestBodyContent(req, requestBody, minimalSwagger)
      expect(mediaTypeMatches).toHaveBeenCalled()
    })
  })
})
