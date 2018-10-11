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

  describe('requestValidator', () => {
    test('calls validateParameters', () => {
      ;(requestBodyValidator as jest.Mock).mockReturnValue(true)
      expect(parameterValidator).not.toHaveBeenCalled()
      requestValidator(swaggerDoc, swaggerDoc.paths['/winter'], 'post', {})
      expect(parameterValidator).toHaveBeenCalled()
    })
    test('when validateParameters returns false it returns false', () => {
      ;(parameterValidator as jest.Mock).mockReturnValue(false)
      ;(requestBodyValidator as jest.Mock).mockReturnValue(true)
      expect(parameterValidator).not.toHaveBeenCalled()
      const result = requestValidator(
        swaggerDoc,
        swaggerDoc.paths['/winter'],
        'post',
        {}
      )
      expect(parameterValidator).toHaveBeenCalled()
      expect(result).toBe(false)
    })
    test('when validateParameters returns true it returns true', () => {
      ;(parameterValidator as jest.Mock).mockReturnValue(true)
      ;(requestBodyValidator as jest.Mock).mockReturnValue(true)
      expect(parameterValidator).not.toHaveBeenCalled()
      const result = requestValidator(
        swaggerDoc,
        swaggerDoc.paths['/winter'],
        'post',
        {}
      )
      expect(parameterValidator).toHaveBeenCalled()
      expect(result).toBe(true)
    })
  })
  test('calls requestBodyValidator', () => {
    ;(parameterValidator as jest.Mock).mockReturnValue(true)
    expect(requestBodyValidator).not.toHaveBeenCalled()
    requestValidator(swaggerDoc, swaggerDoc.paths['/winter'], 'post', {})
    expect(requestBodyValidator).toHaveBeenCalled()
  })

  test('when requestBodyValidator returns false it returns false', () => {
    ;(parameterValidator as jest.Mock).mockReturnValue(true)
    ;(requestBodyValidator as jest.Mock).mockReturnValue(false)
    expect(requestBodyValidator).not.toHaveBeenCalled()
    const result = requestValidator(
      swaggerDoc,
      swaggerDoc.paths['/winter'],
      'post',
      {}
    )
    expect(requestBodyValidator).toHaveBeenCalled()
    expect(result).toBe(false)
  })

  test('when requestBodyValidator returns true it returns true', () => {
    ;(parameterValidator as jest.Mock).mockReturnValue(true)
    ;(requestBodyValidator as jest.Mock).mockReturnValue(true)
    expect(requestBodyValidator).not.toHaveBeenCalled()
    const result = requestValidator(
      swaggerDoc,
      swaggerDoc.paths['/winter'],
      'post',
      {}
    )
    expect(requestBodyValidator).toHaveBeenCalled()
    expect(result).toBe(true)
  })
})
