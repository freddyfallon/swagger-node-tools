import parameterValidator from './'

describe('parameterValidator', () => {
  test('returns true when no parameters are provided', () => {
    const req = {
      headers: {
        cool_header: 1234
      }
    }
    const requiredParams: any = undefined
    const result = parameterValidator(req, requiredParams)
    expect(result).toBe(true)
  })

  test('returns true when no headers or parameters are provided', () => {
    const req = {}
    const requiredParams: any = undefined
    const result = parameterValidator(req, requiredParams)
    expect(result).toBe(true)
  })
  describe('when parameter is in header and is required', () => {
    test('will return false if parameter is present as integer in request where string is required', () => {
      const req = {
        headers: {
          cool_header: 1234
        }
      }
      const requiredParams: any = [
        {
          name: 'cool_header',
          in: 'header',
          schema: {
            type: 'string'
          }
        }
      ]
      try {
        parameterValidator(req, requiredParams)
      } catch (err) {
        expect(err).toEqual(
          Object.assign(
            Error('Found type of number for cool_header, expected string')
          )
        )
      }
    })
    test('will return false if parameter is present as boolean in request where string is required', () => {
      const req = {
        headers: {
          cool_header: false
        }
      }
      const requiredParams: any = [
        {
          name: 'cool_header',
          in: 'header',
          schema: {
            type: 'string'
          }
        }
      ]
      try {
        parameterValidator(req, requiredParams)
      } catch (err) {
        expect(err).toEqual(
          Object.assign(
            Error('Found type of boolean for cool_header, expected string')
          )
        )
      }
    })
    test('will return true if parameter is present as correct type', () => {
      const send = jest.fn()
      const status = jest.fn().mockReturnValue(send)
      const req = {
        headers: {
          cool_header: 'hello'
        }
      }
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
      expect(result).toBe(true)
    })
    describe('when parameter is in query', () => {})
    describe('when parameter is in path', () => {})
    describe('when parameter is in cookie', () => {})
  })
})
