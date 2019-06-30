import classMap from './classMap'

function classFactory(className: string) {
  if (className in classMap) {
    return new classMap[className]()
  } else {
    throw TypeError('no this class: ' + className)
  }
}

export default classFactory
