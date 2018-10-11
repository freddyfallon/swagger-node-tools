import requestBodyValidator from './request-body-validator'
const content = new Map()
content.set('application/json', {})
const requestBody = {
  content
}

describe('requestBodyValidator', () => {
  describe('when request body is empty', () => {
    test('and it is not required it should return true', () => {
      const result = requestBodyValidator({}, requestBody)
      expect(result).toBe(true)
    })
    test('and it is required it should return false', () => {
      const result = requestBodyValidator(
        {},
        { ...requestBody, required: true }
      )
      expect(result).toBe(false)
    })
  })
})
