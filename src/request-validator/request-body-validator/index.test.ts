jest.mock('./required-body-present')
jest.mock('./request-body-content')

import requestBodyValidator from '.'
import requiredBodyPresent from './required-body-present'
import requestBodyContent from './request-body-content'
import minimalSwagger from '../../minimal-swagger'

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
    ;(requestBodyContent as jest.Mock).mockReturnValue(true)
    expect(requiredBodyPresent).not.toHaveBeenCalled()
    requestBodyValidator({}, requestBody, minimalSwagger)
    expect(requiredBodyPresent).toHaveBeenCalled()
  })

  test('when requiredBodyPresent returns false it returns false', () => {
    ;(requiredBodyPresent as jest.Mock).mockReturnValue(false)
    ;(requestBodyContent as jest.Mock).mockReturnValue(true)
    expect(requiredBodyPresent).not.toHaveBeenCalled()
    const result = requestBodyValidator({}, requestBody, minimalSwagger)
    expect(requiredBodyPresent).toHaveBeenCalled()
    expect(result).toBe(false)
  })

  test('when requiredBodyPresent returns true it returns true', () => {
    ;(requiredBodyPresent as jest.Mock).mockReturnValue(true)
    ;(requestBodyContent as jest.Mock).mockReturnValue(true)
    expect(requiredBodyPresent).not.toHaveBeenCalled()
    const result = requestBodyValidator({}, requestBody, minimalSwagger)
    expect(requiredBodyPresent).toHaveBeenCalled()
    expect(result).toBe(true)
  })

  test('calls requestBodyContent if requiredBodyPresent returns true', () => {
    ;(requiredBodyPresent as jest.Mock).mockReturnValue(true)
    expect(requestBodyContent).not.toHaveBeenCalled()
    requestBodyValidator({}, requestBody, minimalSwagger)
    expect(requestBodyContent).toHaveBeenCalled()
  })

  test('does not call requestBodyContent if requiredBodyPresent returns false', () => {
    ;(requiredBodyPresent as jest.Mock).mockReturnValue(false)
    expect(requestBodyContent).not.toHaveBeenCalled()
    requestBodyValidator({}, requestBody, minimalSwagger)
    expect(requestBodyContent).not.toHaveBeenCalled()
  })
})
