import fs from 'fs'
import yaml from 'js-yaml'

export default (document: string) => {
  const documentString = fs.readFileSync(document, { encoding: 'utf-8' })
  const jsondDocument = yaml.safeLoad(documentString)
  return (req: object, res: object, next: Function): void => {
    next()
  }
}
