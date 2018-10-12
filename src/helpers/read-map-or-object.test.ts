import readMapOrObject from './read-map-or-object'

describe('readMapOrObject', () => {
  const key = 'testKey'
  const otherKey = 'nonExistingKey'
  const value = 'value'
  const testObj = {
    [key]: value
  }
  const testMap = new Map(Object.entries(testObj))

  test('can read an existing property from a Map', () => {
    const result = readMapOrObject(testMap, key)
    expect(result).toBe(value)
  })
  test('can read an existing property from an object', () => {
    const result = readMapOrObject(testObj, key)
    expect(result).toBe(value)
  })
  test('can read a non-existant property from a Map', () => {
    const result = readMapOrObject(testMap, otherKey)
    expect(result).toBe(undefined)
  })

  test('can read a non-existant property from an object', () => {
    const result = readMapOrObject(testObj, otherKey)
    expect(result).toBe(undefined)
  })
})
