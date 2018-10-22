import { Schema } from 'js-yaml'
import nullable from './nullable'

export default (value: any, schema: Schema): boolean => {
  return nullable(value, schema)
}
