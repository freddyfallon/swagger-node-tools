import { map, complement, contains, keysIn, filter, propEq } from 'ramda'

const doesNotContain = complement(contains)

export const throwErrorForWrongType = (
  typeFound: string,
  propertyName: string,
  expectedType: string
) => {
  throw new Error(
    `Found type of ${typeFound.toLowerCase()} for ${propertyName}, expected ${expectedType}`
  )
}

const throwErrorForMissingField = (fieldName: string) => {
  throw new Error(`${fieldName} required`)
}

export const checkRequiredFields = (
  requestHeaders: any,
  headerParameters: any
) => {
  const requiredFields = filter(
    item => propEq('required', true, item),
    headerParameters
  )

  map((item: any) => {
    if (doesNotContain(item.name, keysIn(requestHeaders))) {
      throwErrorForMissingField(item.name)
    }
  }, requiredFields)
}
