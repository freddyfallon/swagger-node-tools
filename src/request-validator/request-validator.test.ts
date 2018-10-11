import requestValidator from './request-validator'
import minimalValidSwagger from '../minimal-swagger'

const status = jest.fn()
const send = jest.fn()
const next = jest.fn()

describe('requestValidator', () => {
  beforeEach(() => {
    status.mockReturnValue({ send })
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe("if the path of the request doesn't match the swaggerDoc", () => {
    test('return a 400 with error message', () => {
      const req = { path: '/' }
      const res = { status }

      requestValidator(minimalValidSwagger)(req, res, next)

      expect(next).not.toHaveBeenCalled()
      expect(status).toHaveBeenCalledWith(400)
      expect(send).toHaveBeenCalledWith(
        `${req.path} not found in swagger defined paths`
      )
    })
  })

  describe('if the path of the request matches the swaggerDoc', () => {
    test('calls next', () => {
      const path = '/winter'
      const paths = { '/winter': {} }
      const swaggerDoc = { ...minimalValidSwagger, paths }
      const req = { path }
      const res = { status }

      expect(send).not.toHaveBeenCalled()
      expect(next).not.toHaveBeenCalled()
      requestValidator(swaggerDoc)(req, res, next)
      expect(next).toHaveBeenCalled()
    })
  })
})
