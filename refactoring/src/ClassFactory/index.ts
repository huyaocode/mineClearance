import classMap from './classMap'

export default (className: string) => {
  if (className in classMap) {
    return new classMap[className]()
  } else {
    throw TypeError('no such class')
  }
}
