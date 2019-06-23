/**
 * 阻止时间冒泡
 * @param {*} event 事件
 */
function stopBubble(event) {
  if (event.stopPropagation) {
    event.stopPropagation()
  } else {
    event.cancelBubble = true
  }
  return false
}

export default stopBubble