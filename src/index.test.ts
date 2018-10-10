import middleware from './'
describe('middleware', () => {
  describe('when provided an empty string', () => {
    test('returns an error message', () => {
      try {
        middleware('')
      } catch (err) {
        expect(err).toEqual(Error('No file path given'))
      }
    })
  })
})

/*
Cases we want to handle:

1. When we are provided no document at all
2. When were are provided a path to a document that has an incorrect type (e.g. JSON, js, text, html, anything not YAML essentially)
3. When the file location does not exist
4. When the file is in the correct location and the correct type
  - We will then want to parse and validate the YAML file (could be valid but invalid openapi, or vice versa)
  - Make sure that we are calling our request validator

*/