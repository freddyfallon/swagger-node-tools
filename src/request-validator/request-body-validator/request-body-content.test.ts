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
const body = JSON.stringify({ some: 'data' })

describe('requestBodyContent', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when requestBodyContent is called', () => {
    // body required && present -> call
    describe('requestBody is required and req.body is present', () => {
      test('it should call mediaTypeMatches', () => {
        expect(mediaTypeMatches).not.toHaveBeenCalled()
        requestBodyContent(
          { req, body },
          { ...requestBody, required: true },
          minimalSwagger
        )
        expect(mediaTypeMatches).toHaveBeenCalled()
      })
    })
    // body required && !present -> false? no call?
    describe('requestBody is required and req.body not present', () => {
      test('it should call mediaTypeMatches', () => {
        expect(mediaTypeMatches).not.toHaveBeenCalled()
        requestBodyContent(
          { req },
          { ...requestBody, required: true },
          minimalSwagger
        )
        expect(mediaTypeMatches).not.toHaveBeenCalled()
      })
    })
    // body not required && present -> call
    describe('requestBody not required and req.body is present', () => {
      test('it should call mediaTypeMatches', () => {
        expect(mediaTypeMatches).not.toHaveBeenCalled()
        requestBodyContent(
          { req, body },
          { ...requestBody, required: false },
          minimalSwagger
        )
        expect(mediaTypeMatches).toHaveBeenCalled()
      })
    })
    // body not required && !present -> no call
    describe('requestBody not required and req.body not present', () => {
      test('it should call mediaTypeMatches', () => {
        expect(mediaTypeMatches).not.toHaveBeenCalled()
        requestBodyContent(
          { req },
          { ...requestBody, required: false },
          minimalSwagger
        )
        expect(mediaTypeMatches).not.toHaveBeenCalled()
      })
    })
    // body required not specified (default) && !present -> no call
    describe('requestBody required is not specified and req.body not present', () => {
      test('it should call mediaTypeMatches', () => {
        expect(mediaTypeMatches).not.toHaveBeenCalled()
        requestBodyContent({ req }, { ...requestBody }, minimalSwagger)
        expect(mediaTypeMatches).not.toHaveBeenCalled()
      })
    })
  })
})
