import parameterValidator from './'
import minimalSwaggerDoc from '../../minimal-swagger'

describe('parameterValidator', () => {
  test('returns true when no parameters are provided', () => {
    const req = {
      headers: {
        cool_header: 1234
      }
    }
    const requiredParams: any = undefined
    const result = parameterValidator(req, requiredParams, minimalSwaggerDoc)
    expect(result).toBe(true)
  })

  test('returns true when no headers or parameters are provided', () => {
    const req = {}
    const requiredParams: any = undefined
    const result = parameterValidator(req, requiredParams, minimalSwaggerDoc)
    expect(result).toBe(true)
  })

  describe('when parameter is in header and is required', () => {
    test('will throw error if parameter is present as integer in request where string is required', () => {
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
        parameterValidator(req, requiredParams, minimalSwaggerDoc)
      } catch (err) {
        expect(err).toEqual(
          Object.assign(
            Error('Found type of number for cool_header, expected string')
          )
        )
      }
    })
    test('will throw error if parameter is present as boolean in request where string is required', () => {
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
        parameterValidator(req, requiredParams, minimalSwaggerDoc)
      } catch (err) {
        expect(err).toEqual(
          Object.assign(
            Error('Found type of boolean for cool_header, expected string')
          )
        )
      }
    })
    test('will throw error if parameter is present as correct type', () => {
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

      const result = parameterValidator(req, requiredParams, minimalSwaggerDoc)
      expect(result).toBe(true)
    })

    test('will throw error if parameter is present as correct type in a $ref', () => {
      const req = {
        headers: {
          cool_header: 'hello'
        }
      }
      const requiredParams: any = [
        {
          name: 'cool_header',
          in: 'header',
          schema: { $ref: '#/components/schemas/coolHeaderSchema' }
        }
      ]

      const paths = { '/': {} }
      const schemas = new Map()
      schemas.set('coolHeaderSchema', {
        type: 'string'
      })

      const swaggerDoc = {
        ...minimalSwaggerDoc,
        paths,
        components: {
          schemas
        }
      }

      const result = parameterValidator(req, requiredParams, swaggerDoc)
      expect(result).toBe(true)
    })

    test('will throw error if parameter is present as incorrect type in a $ref', () => {
      const req = {
        headers: {
          cool_header: 123
        }
      }
      const requiredParams: any = [
        {
          name: 'cool_header',
          in: 'header',
          schema: { $ref: '#/components/schemas/coolHeaderSchema' }
        }
      ]

      const paths = { '/': {} }
      const schemas = new Map()
      schemas.set('coolHeaderSchema', {
        type: 'string'
      })

      const swaggerDoc = {
        ...minimalSwaggerDoc,
        paths,
        components: {
          schemas
        }
      }

      try {
        parameterValidator(req, requiredParams, swaggerDoc)
      } catch (err) {
        expect(err).toEqual(
          Object.assign(
            Error('Found type of number for cool_header, expected string')
          )
        )
      }
    })

    test.skip('will throw error if parameter is marked as required but are not given', () => {
      const req = {
        headers: {}
      }
      const requiredParams: any = [
        {
          name: 'cool_header',
          in: 'header',
          require: true,
          schema: {
            type: 'string'
          }
        }
      ]
      try {
        parameterValidator(req, requiredParams, minimalSwaggerDoc)
      } catch (err) {
        expect(err).toEqual(
          Object.assign(
            Error('Found type of number for cool_header, expected string')
          )
        )
      }
    })

    describe('when parameter is in query', () => {})
    describe('when parameter is in path', () => {})
    describe('when parameter is in cookie', () => {})
  })
})
