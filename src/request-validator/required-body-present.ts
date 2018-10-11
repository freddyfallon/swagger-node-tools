import { RequestBody } from '../interfaces'
export default (req: any, requestBodyRequired: boolean = false): boolean => {
  if (requestBodyRequired) {
    return !!req.body
  }
  return true
}
