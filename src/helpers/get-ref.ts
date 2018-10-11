import { OpenAPI } from '../interfaces'
import R from 'ramda'

export default (document: OpenAPI, ref: string): object | undefined => {
  // handle files as well as in-document $refs
  if (document.components && R.has('schemas', document.components)) {
    const key = ref.replace('#/components/schemas/', '')
    const obj = document.components.schemas || new Map()

    return obj.get(key)
  }

  return {}
}
