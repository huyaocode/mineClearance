class EventCenter {
  // 存储事件于其回调函数
  clientList: {
    [propName: string]: Array<Function>
  } = {}

  // 监听事件，为事件名添加回调函数
  listen(eventName: string, callback: Function): void {
    if (!this.clientList[eventName]) {
      this.clientList[eventName] = []
    }
    this.clientList[eventName].push(callback) // 订阅的消息添加进缓存列表
  }

  // 出发某事件，调用其所有的回调函数
  trigger(eventName, ...args): boolean {
    var callbacks = this.clientList[eventName]
    if (!callbacks || callbacks.length === 0) {
      // 如果没有绑定对应的消息
      return false
    }
    for (var i = 0, callback; (callback = callbacks[i++]); ) {
      callback(...args)
    }
    return true
  }

  // 为某个事件移除一个监听对象
  remove(eventName: string, callback: Function): void {
    var callbacks = this.clientList[eventName]
    if (!callbacks) {
      // 如果 eventName 对应的消息没有被人订阅，则直接返回
      return
    }
    if (!callback) {
      // 如果没有传入具体的回调函数，表示需要取消 eventName 对应消息的所有订阅
      callbacks && (callbacks.length = 0)
    } else {
      for (var l = callbacks.length - 1; l >= 0; l--) {
        // 反向遍历订阅的回调函数列表
        var _callback = callbacks[l]
        if (_callback === callback) {
          callbacks.splice(l, 1) // 删除订阅者的回调函数
        }
      }
    }
  }
}

// 返回单例
let getSingleEventCenter = (function() {
  let eventCenter
  return function() {
    if (!eventCenter) {
      eventCenter = new EventCenter()
    }
    return eventCenter
  }
})()

export default getSingleEventCenter
