import { OpenAPI } from '../interfaces'

export default (document: OpenAPI) => {
  return (req: any, res: any, next: Function): void => {
    if (!document.paths[req.path]) {
      return res
        .status(400)
        .send(`${req.path} not found in swagger defined paths`)
    }
    // get the definition at that path
    // validate that request
    next()
  }
}
