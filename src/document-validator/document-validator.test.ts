jest.mock('./paths-validator')
import requestValidator from './document-validator'
import pathsValidator from './paths-validator'
import minimalSwaggerDoc from '../minimal-swagger'

describe('documentValidator', () => {
  test('calls pathsValidator', () => {
    expect(pathsValidator).not.toBeCalled()
    requestValidator(minimalSwaggerDoc)
    expect(pathsValidator).toBeCalled()
  })
})
