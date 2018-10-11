jest.mock('./required-body-present')
import requestBodyValidator from './request-body-validator'
import requiredBodyPresent from './required-body-present'

const content = new Map()
content.set('application/json', {})
const requestBody = {
  content
}

describe('requestBodyValidator', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('calls requiredBodyPresent', () => {
    ;(requiredBodyPresent as jest.Mock).mockReturnValue(true)
    expect(requiredBodyPresent).not.toHaveBeenCalled()
    requestBodyValidator({}, requestBody)
    expect(requiredBodyPresent).toHaveBeenCalled()
  })

  test('when requiredBodyPresent returns false it returns false', () => {
    ;(requiredBodyPresent as jest.Mock).mockReturnValue(false)
    expect(requiredBodyPresent).not.toHaveBeenCalled()
    const result = requestBodyValidator({}, requestBody)
    expect(requiredBodyPresent).toHaveBeenCalled()
    expect(result).toBe(false)
  })

  test('when requiredBodyPresent returns false it returns false', () => {
    ;(requiredBodyPresent as jest.Mock).mockReturnValue(true)
    expect(requiredBodyPresent).not.toHaveBeenCalled()
    const result = requestBodyValidator({}, requestBody)
    expect(requiredBodyPresent).toHaveBeenCalled()
    expect(result).toBe(true)
  })
})
