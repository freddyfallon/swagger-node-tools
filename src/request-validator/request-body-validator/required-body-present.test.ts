import requestBodyValidator from '.'
import minimalSwagger from '../../minimal-swagger'

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

describe('requestBodyValidator', () => {
  describe('when request body is empty', () => {
    test('and it is not required it should return true', () => {
      const result = requestBodyValidator(req, requestBody, minimalSwagger)
      expect(result).toBe(true)
    })
    test('and it is required it should return false', () => {
      const result = requestBodyValidator(
        req,
        { ...requestBody, required: true },
        minimalSwagger
      )
      expect(result).toBe(false)
    })
  })
})
