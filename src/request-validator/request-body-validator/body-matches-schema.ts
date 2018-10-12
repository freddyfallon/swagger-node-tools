import { Schema } from 'js-yaml'
import schemaValidation from './schema-validation'
import R from 'ramda'

export default (req: any, schema: Schema): boolean => {
  // for each key in req.body (assuming json object)
  // validate against schema
  return Object.entries(req.body)
    .map(([k = '', v]) => {
      const string = R.propOr('', k)(schema)
      return schemaValidation(v, string)
    })
    .every(x => x === true)
}
