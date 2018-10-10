import fs from 'fs'
import yaml from 'js-yaml'
import express from 'express'
import R from 'ramda'

import validator from './request-validator/request-validator'
import constants from './constants'

const { NO_FILE_PATH_ERROR } = constants

export default (document: string): express.RequestHandler => {
  if (R.isEmpty(document)) {
    throw new Error(NO_FILE_PATH_ERROR)
  }
  const documentString = fs.readFileSync(document, { encoding: 'utf-8' })
  const jsonDocument = yaml.safeLoad(documentString)
  return validator(jsonDocument)
}