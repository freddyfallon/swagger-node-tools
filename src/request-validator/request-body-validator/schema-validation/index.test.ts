jest.mock('./nullable')
import nullable from './nullable'
import schemaValidation from '.'

describe('schemaValidation', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('calls nullable', () => {
    expect(nullable).not.toHaveBeenCalled()
    schemaValidation(null, {})
    expect(nullable).toHaveBeenCalled()
  })
})
