import requestValidator from '.'
import minimalValidSwagger from '../minimal-swagger'

const status = jest.fn()
const send = jest.fn()
const next = jest.fn()
const headers = { 'content-type': 'application/json' }
const content = new Map()
content.set('application/json', {})
const requestBody = {
  content
}

describe('requestValidator', () => {
  beforeEach(() => {
    status.mockReturnValue({ send })
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe("if the path of the request doesn't match the swaggerDoc", () => {
    test('return a 400 with error message', () => {
      const req = { path: '/', headers }
      const res = { status }

      requestValidator(minimalValidSwagger)(req, res, next)

      expect(next).not.toHaveBeenCalled()
      expect(status).toHaveBeenCalledWith(400)
      expect(send).toHaveBeenCalledWith(
        `${req.path} not found in swagger defined paths`
      )
    })
  })

  describe('if the path of the request is not a $ref and object matches the swaggerDoc', () => {
    test('calls next if method exists on defined path', () => {
      const path = '/winter'
      const paths = {
        '/winter': {
          post: {
            responses: {
              default: { description: 'Cool' }
            },
            requestBody
          }
        }
      }
      const swaggerDoc = { ...minimalValidSwagger, paths }
      const req = { path, method: 'POST', headers }
      const res = { status }

      expect(send).not.toHaveBeenCalled()
      expect(next).not.toHaveBeenCalled()
      requestValidator(swaggerDoc)(req, res, next)
      expect(next).toHaveBeenCalled()
    })

    test('returns a 400 if method does not exist on defined path', () => {
      const path = '/winter'
      const paths = {
        '/winter': {
          get: {
            responses: { default: { description: 'Cool' } },
            requestBody
          }
        }
      }
      const swaggerDoc = { ...minimalValidSwagger, paths }
      const req = { path, method: 'CHESSEBURGER', headers }
      const res = { status }

      expect(send).not.toHaveBeenCalled()
      expect(next).not.toHaveBeenCalled()
      requestValidator(swaggerDoc)(req, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(status).toHaveBeenCalledWith(400)
      expect(send).toHaveBeenCalledWith(`${req.method} not valid for ${path}`)
    })
  })

  describe('if the path of the request is a $ref object and matches the swaggerDoc', () => {
    test('calls next if method exists on defined path', () => {
      const path = '/winter'
      const paths = { '/winter': { $ref: '#/components/schemas/winter' } }
      const schemas = new Map()
      schemas.set('winter', {
        get: {
          responses: {
            default: {
              description: 'Cool'
            }
          },
          requestBody
        }
      })
      const swaggerDoc = {
        ...minimalValidSwagger,
        paths,
        components: {
          schemas
        }
      }
      const req = { path, method: 'GET', headers }
      const res = { status }

      expect(send).not.toHaveBeenCalled()
      expect(next).not.toHaveBeenCalled()
      requestValidator(swaggerDoc)(req, res, next)
      expect(next).toHaveBeenCalled()
    })

    test('returns a 400 if method does not exist on defined path', () => {
      const path = '/winter'
      const paths = { '/winter': { $ref: '#/components/schemas/winter' } }
      const schemas = new Map()
      schemas.set('winter', {
        post: {
          responses: {
            default: {
              description: 'Cool'
            }
          },
          requestBody
        }
      })
      const swaggerDoc = {
        ...minimalValidSwagger,
        paths,
        components: {
          schemas
        }
      }
      const req = { path, method: 'CHESSEBURGER' }
      const res = { status }

      expect(send).not.toHaveBeenCalled()
      expect(next).not.toHaveBeenCalled()
      requestValidator(swaggerDoc)(req, res, next)
      expect(next).not.toHaveBeenCalled()
      expect(status).toHaveBeenCalledWith(400)
      expect(send).toHaveBeenCalledWith(`${req.method} not valid for ${path}`)
    })
  })
})
