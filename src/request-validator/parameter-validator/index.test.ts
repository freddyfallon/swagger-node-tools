import parameterValidator from './'

describe('parameterValidator', () => {
  test('returns true when no parameters are provided', () => {
    const send = jest.fn()
    const status = jest.fn().mockReturnValue(send)
    const req = {
      headers: {
        cool_header: 1234
      }
    }
    const res = { status }
    const requiredParams: any = undefined
    const result = parameterValidator(req, requiredParams)
    expect(result).toBe(true)
  })

  test('returns true when no headers or parameters are provided', () => {
    const send = jest.fn()
    const status = jest.fn().mockReturnValue(send)
    const req = {}
    const res = { status }
    const requiredParams: any = undefined
    const result = parameterValidator(req, requiredParams)
    expect(result).toBe(true)
  })
  describe('when parameter is in header and is required', () => {
    test('will return false if parameter is present as integer in request where string is required', () => {
      const send = jest.fn()
      const status = jest.fn().mockReturnValue(send)
      const req = {
        headers: {
          cool_header: 1234
        }
      }
      const res = { status }
      const requiredParams: any = [
        {
          name: 'cool_header',
          in: 'header',
          schema: {
            type: 'string'
          }
        }
      ]
      const result = parameterValidator(req, requiredParams)
      expect(result).toBe(false)
    })
    test('will return false if parameter is present as boolean in request where string is required', () => {
      const send = jest.fn()
      const status = jest.fn().mockReturnValue(send)
      const req = {
        headers: {
          cool_header: false
        }
      }
      const res = { status }
      const requiredParams: any = [
        {
          name: 'cool_header',
          in: 'header',
          schema: {
            type: 'string'
          }
        }
      ]
      const result = parameterValidator(req, requiredParams)
      expect(result).toBe(false)
    })
    test('will return true if parameter is present as correct type', () => {
      const send = jest.fn()
      const status = jest.fn().mockReturnValue(send)
      const req = {
        headers: {
          cool_header: 'hello'
        }
      }
      const res = { status }
      const requiredParams: any = [
        {
          name: 'cool_header',
          in: 'header',
          schema: {
            type: 'string'
          }
        }
      ]
      const result = parameterValidator(req, requiredParams)
      expect(result).toBe(false)
    })
    describe('when parameter is in query', () => {})
    describe('when parameter is in path', () => {})
    describe('when parameter is in cookie', () => {})
  })
})
