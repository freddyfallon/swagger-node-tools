export default(document : string) => {
  return (req : object, res : object, next : Function) : void => {
    next()
  }
}
