import bodyMatchesSchema from './body-matches-schema'

const applicationJSON = 'application/json'
const req = {
  headers: {
    'content-type': applicationJSON
  },
  body: {
    testKey: null
  }
}
const content = new Map()
content.set(applicationJSON, {})
const requestBody = {
  content
}

describe('bodyMatchesSchema', () => {
  test('when body does match schema', () => {
    const result = bodyMatchesSchema(req, {
      testKey: {
        nullable: true
      }
    })
    expect(result).toBe(true)
  })
  test('when body does not match schema', () => {
    const result = bodyMatchesSchema(req, {
      testKey: {
        nullable: false
      }
    })
    expect(result).toBe(false)
  })
})
