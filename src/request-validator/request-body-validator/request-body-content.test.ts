jest.mock('./media-type-matches')
jest.mock('./body-matches-schema')
import requestBodyContent from './request-body-content'
import mediaTypeMatches from './media-type-matches'
import bodyMatchesSchema from './body-matches-schema'
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
const body = {}

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
          { ...req, body },
          { ...requestBody, required: true },
          minimalSwagger
        )
        expect(mediaTypeMatches).toHaveBeenCalled()
      })
      describe('mediaTypeMatches returns false', () => {
        test('it should not call bodyMatchesSchema', () => {
          ;(mediaTypeMatches as jest.Mock).mockReturnValue(false)
          expect(bodyMatchesSchema).not.toHaveBeenCalled()
          requestBodyContent(
            { ...req, body },
            { ...requestBody, required: true },
            minimalSwagger
          )
          expect(bodyMatchesSchema).not.toHaveBeenCalled()
        })
      })
      describe('mediaTypeMatches returns true', () => {
        test('it should call bodyMatchesSchema', () => {
          ;(mediaTypeMatches as jest.Mock).mockReturnValue(true)
          expect(bodyMatchesSchema).not.toHaveBeenCalled()
          requestBodyContent(
            { ...req, body },
            { ...{ ...requestBody }, required: true },
            minimalSwagger
          )
          expect(bodyMatchesSchema).toHaveBeenCalled()
        })
      })
    })
    // body required && !present -> no call
    describe('requestBody is required and req.body not present', () => {
      test('it should call mediaTypeMatches', () => {
        expect(mediaTypeMatches).not.toHaveBeenCalled()
        requestBodyContent(
          { ...req },
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
          { ...req, body },
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
          { ...req },
          { ...requestBody, required: false },
          minimalSwagger
        )
        expect(mediaTypeMatches).not.toHaveBeenCalled()
      })
    })
    // body required not specified (default) && !present -> no call
    describe('requestBody required is not specified (default to false) and req.body not present', () => {
      test('it should call mediaTypeMatches', () => {
        expect(mediaTypeMatches).not.toHaveBeenCalled()
        requestBodyContent({ ...req }, { ...requestBody }, minimalSwagger)
        expect(mediaTypeMatches).not.toHaveBeenCalled()
      })
    })
  })
})
