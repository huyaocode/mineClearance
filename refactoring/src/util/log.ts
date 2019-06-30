import getCurTime from './getCurentTime'
/**
 * 记录日志
 * @param type 日志名
 */
export default function(type) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    var oldValue = descriptor.value

    descriptor.value = function() {
      console.log(`${type}  ${getCurTime()}`)
      return oldValue.apply(this, arguments)
    }

    return descriptor
  }
}
