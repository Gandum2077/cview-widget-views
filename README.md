# CView Widget Views

本模块意在改善 JSBox Widget 的编写体验。

由于编写 JSBox Widget 需要一层套一层的 views，这很繁琐，需要相当多的括号。而且编写的时候，需要反复查看文档，很不方便。为了改善这些问题，开发本模块。

- 将每一种视图作为一个单独的类

- 将每一种视图的属性都做成一个方法，可以链式调用，不再需要反复写大括号

- 将文档写在方法的注释中，在 VSCode 中输入方法名的时候，可以自动提示

## 示例

```js
const { Text, Image, Vgrid, Zstack } = require("cview-widget-views");

$widget.setTimeline({
  render: ctx => {
    const title = new Text()
      .text("示例文字")
      .frame({
        maxHeight: Infinity,
        maxWidth: Infinity,
        alignment: $widget.alignment.bottomLeading
      })
      .color($color("#E5E5EA"))
      .font($font(25))
      .bold()
      .padding(10).definition;

    const zstack = new Zstack();

    zstack.views = [title];
    return zstack.definition;
  }
});
```
