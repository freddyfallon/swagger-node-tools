export default (req: any, requestBodyRequired: boolean = false): boolean =>
  requestBodyRequired ? !!req.body : true
