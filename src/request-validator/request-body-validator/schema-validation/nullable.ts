export default (value: any, schema: any): boolean =>
  (schema.nullable && value === null) || value !== null
