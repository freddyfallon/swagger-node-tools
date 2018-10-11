jest.mock('./paths-validator')
import documentValidator from './document-validator'
import pathsValidator from './paths-validator'
import minimalSwaggerDoc from '../minimal-swagger'

describe('documentValidator', () => {
  test('calls pathsValidator', () => {
    expect(pathsValidator).not.toHaveBeenCalled()
    documentValidator(minimalSwaggerDoc)
    expect(pathsValidator).toHaveBeenCalled()
  })
})
