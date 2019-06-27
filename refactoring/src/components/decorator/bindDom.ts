export default function() {
  this.dom = document.getElementById(this.id)
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('里面', target, propertyKey, descriptor)
    console.log('this', this)
  }
}
