import R from 'ramda'
import { RequestBody } from '../interfaces'
import requireBodyPresent from './required-body-present'

export default (req: any, requestBody: RequestBody): boolean =>
  requireBodyPresent(req, R.propOr(false, 'required')(requestBody))
