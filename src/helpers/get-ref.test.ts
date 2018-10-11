import getRef from './get-ref'
import minimalSwaggerDoc from '../minimal-swagger'

describe('getRef', () => {
  test('returns a valid object on the end of a $ref in the same file', () => {
    const paths = { '/winter': { $ref: '#/components/schemas/winter' } }
    const schemas = new Map()
    schemas.set('winter', {
      get: {
        responses: {
          default: {
            description: 'Cool'
          }
        }
      }
    })

    const swaggerDoc = {
      ...minimalSwaggerDoc,
      paths,
      components: {
        schemas
      }
    }
    const expectedResponse = {
      get: { responses: { default: { description: 'Cool' } } }
    }
    expect(getRef(swaggerDoc, '#/components/schemas/winter')).toEqual(
      expectedResponse
    )
  })
})
