import { OpenAPI } from '../interfaces'

export default (document: any) => {
  return (req: any, res: any, next: Function): void => {
    if (!document.paths[req.path]) {
      return res
        .status(400)
        .send(`${req.path} not found in swagger defined paths`)
    }

    if (!document.paths[req.path][req.method.toLowerCase()]) {
      return res.status(400).send(`${req.method} not valid for ${req.path}`)
    }

    // validate that request
    next()
  }
}
