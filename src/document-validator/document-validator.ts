import { OpenAPI } from '../interfaces'
import pathsValidator from './paths-validator'

export default (document: OpenAPI): boolean => pathsValidator(document)