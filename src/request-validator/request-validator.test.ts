jest.mock('./parameter-validator')
jest.mock('./request-body-validator')
import requestValidator from './request-validator'
import minimalSwagger from '../minimal-swagger'
import parameterValidator from './parameter-validator'
import requestBodyValidator from './request-body-validator'

describe('requestValidator', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const paths = {
    '/winter': { post: { responses: { default: { description: 'Cool' } } } }
  }
  const swaggerDoc = {
    ...minimalSwagger,
    paths
  }

  describe('validating parameters', () => {
    test('calls validateParameters', () => {
      expect(parameterValidator).not.toHaveBeenCalled()
      requestValidator(swaggerDoc, swaggerDoc.paths['/winter'], 'post', {})
      expect(parameterValidator).toHaveBeenCalled()
    })
    // describe('when validateParameters returns false', () => {
    //   test('returns false', () => {
    //     // parameterValidator.mockReturnValue(() => false)
    //   })
    // })
    describe('when validateParameters returns true', () => {
      test('returns true', () => {})
    })
  })
  describe('validating requestBody', () => {
    test('calls requestBodyValidator', () => {
      expect(requestBodyValidator).not.toHaveBeenCalled()
      requestValidator(swaggerDoc, swaggerDoc.paths['/winter'], 'post', {})
      expect(requestBodyValidator).toHaveBeenCalled()
    })
    test('', () => {})
    test('', () => {})
    test('', () => {})
  })
})
