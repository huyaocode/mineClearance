# 扫雷游戏

## 设置网页在浏览器Tab选项卡上的图标

```javascript
<link rel="shortcut icon" type="image/x-icon" href="图标名.ico" />
```
## 让图片和文字居中对齐的方法
如果一个盒子有2列或者3列排列，有图片，有文字，怎么实现文字始终对齐图片的中间位置呢？ 

方法就是使用vertical-align:middle;也就是给一列都使用这个属性，需要注意的是：这个属性只对行内元素起作用，如果不是行内元素要加上diaplay:inline-block;

头部标题为例子

## 小方块实现border重合
margin 的下和左为 负的border值
```
border: 1px solid #eee;
margin: 0 0 -1px -1px;
```