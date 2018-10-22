import nullable from './nullable'

describe('nullable', () => {
  const nonNullValue = 'IAmNotNull'
  describe('when schema.nullable is true', () => {
    test('should return true when null passed in', () => {
      const result = nullable(null, {
        nullable: true
      })
      expect(result).toBe(true)
    })
    test('should return true when not-null passed in', () => {
      const result = nullable(nonNullValue, {
        nullable: true
      })
      expect(result).toBe(true)
    })
  })
  describe('when schema.nullable is false', () => {
    test('should return false when null passed in', () => {
      const result = nullable(null, {
        nullable: false
      })
      expect(result).toBe(false)
    })
    test('should return true when not-null passed in', () => {
      const result = nullable(nonNullValue, {
        nullable: false
      })
      expect(result).toBe(true)
    })
  })
})
