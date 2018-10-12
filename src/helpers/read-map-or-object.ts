export default (mapOrObj: any, key: string): any => {
  let contentMap = mapOrObj

  if (!(mapOrObj instanceof Map)) {
    contentMap = new Map(Object.entries(mapOrObj || {}))
  }

  return contentMap.get(key)
}
