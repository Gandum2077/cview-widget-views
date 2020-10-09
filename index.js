/**
 * widget视图的基本类。仿照SwiftUI语法，通过链式调用改变自身的属性。
 * definition属性获取定义，views属性设置子view
 */
class BaseWidget {
  constructor(ordered = false) {
    this.ordered = ordered;
    this._props = new Map();
    this._views = [];
  }

  get definition() {
    return this._getDefinition(this);
  }

  _getDefinition(view) {
    const definition = {};
    definition.type = view.type;
    if (view.ordered) definition.modifiers = view.modifiers;
    else definition.props = view.props;
    if (view.views && view.views.length)
      definition.views = view.views.map(n => {
        if (n instanceof BaseWidget) return this._getDefinition(n);
        else return n;
      });
    return definition;
  }

  get views() {
    return this._views;
  }

  set views(arr) {
    this._views = arr;
  }

  /**
   *  获得props对象
   */
  get props() {
    return Object.fromEntries(this._props.entries());
  }

  /**
   * 获得modifiers数组
   */
  get modifiers() {
    return [...this._props.entries()].map(n => Object.fromEntries([n]));
  }

  /**
   * 直接设定views
   * @param {any[]} arr
   */
  setViews(arr) {
    this.views = arr;
    return this;
  }

  /**
   * 直接设定属性
   * @param {string} name
   * @param {*} value
   */
  setProps(name, value) {
    this._setProps(name, value);
    return this;
  }

  _setProps(name, value) {
    this._props.set(name, value);
  }

  /**
   * 设定宽高有两种用法 {width, height} 或者 {minWidth, idealWidth, maxWidth, minHeight, idealHeight, maxHeight}
   * 另外还有alignment属性，默认$widget.alignment.center, 还有leading, trailing, top, bottom, topLeading, topTrailing, bottomLeading, bottomTrailing
   * 当需要视图撑满父视图时，使用 maxWidth: Infinity 和 maxHeight: Infinity。
   */
  frame({
    width,
    height,
    alignment,
    minWidth,
    idealWidth,
    maxWidth,
    minHeight,
    idealHeight,
    maxHeight
  } = {}) {
    this._setProps("frame", {
      width,
      height,
      alignment,
      minWidth,
      idealWidth,
      maxWidth,
      minHeight,
      idealHeight,
      maxHeight
    });
    return this;
  }

  /**
   * 修改中点的位置
   * @param {{}} point JSBoxPoint
   */
  position(point) {
    this._setProps("position", point);
    return this;
  }

  /**
   * 指定视图的位置偏移(向右下方向偏移的位置)
   * @param {{}} point JSBoxPoint
   */
  offset(point) {
    this._setProps("offset", point);
    return this;
  }

  /**
   * 指定视图的边距
   * @param {number|{}} param 数字或者$insets，若为数字即四边皆为此数字
   */
  padding(param) {
    this._setProps("padding", param);
    return this;
  }

  /**
   * 指定布局流程中的优先级（默认为 0）
   * @param {number} num
   */
  layoutPriority(num) {
    this._setProps("layoutPriority", num);
  }

  /**
   * 圆角效果，通过{value: 10, style: 1 } 使用平滑圆角，其中0: circular, 1: continuous
   * @param {number|{value: number, style: number}} param
   */
  cornerRadius(param) {
    this._setProps("cornerRadius", param);
    return this;
  }

  /**
   * 实现边框效果
   * @param {{color: {}, width: number}} param {color: JSBoxColor, width: number}
   */
  border({ color, width }) {
    this._setProps("border", { color, width });
    return this;
  }

  /**
   * 是否裁剪超出边框部分的内容
   * @param {boolean} bool
   * @param {boolean} antialiased 抗锯齿
   */
  clipped(bool = true, antialiased) {
    if (!antialiased) this._setProps("clipped", bool);
    else
      this._setProps("clipped", {
        antialiased: true
      });
    return this;
  }

  /**
   * 半透明效果
   * @param {number} num 范围0~1
   */
  opacity(num) {
    this._setProps("opacity", num);
    return this;
  }

  /**
   * 应用高斯模糊效果
   * @param {number} num
   */
  blur(num) {
    this._setProps("blur", num);
    return this;
  }

  /**
   * 视图的前景色，例如文字颜色
   * @param {{}} color JSBoxColor
   */
  color(color) {
    this._setProps("color", color);
    return this;
  }

  /**
   * 视图的背景填充，可以是颜色也可以是图片或者渐变效果
   * @param {{}} param JSBoxColor|Image|Gradient
   */
  background(param) {
    this._setProps("background", param);
    return this;
  }

  /**
   * 指定点击视图后会打开的链接（仅支持 2 * 4 和 4 * 4 的小组件）
   * @param {string} url
   */
  link(url) {
    this._setProps("link", url);
    return this;
  }

  /**
   * 与 link 类似，但 widgetURL 指定的是点击整个小组件时候打开的链接
   * @param {string} url
   */
  widgetURL(url) {
    this._setProps("widgetURL", url);
    return this;
  }
}

class Text extends BaseWidget {
  constructor() {
    super();
    this.type = "text";
  }

  /**
   * 文本
   * @param {string} text
   */
  text(text) {
    this._setProps("text", text);
    return this;
  }

  /**
   * date和style配合显示时间或日期
   * @param {Date} date
   */
  date(date) {
    this._setProps("date", date);
    return this;
  }

  /**
   * date和style配合显示时间或日期
   * 使用 $widget.dateStyle，包含 time, date, relative, offset, timer
   * @param {number} num
   */
  style(num) {
    this._setProps("style", num);
    return this;
  }

  /**
   * startDate 和 endDate 来显示一个时间区间
   * @param {Date} date
   */
  startDate(date) {
    this._setProps("startDate", date);
    return this;
  }

  /**
   * startDate 和 endDate 来显示一个时间区间
   * @param {Date} date
   */
  endDate(date) {
    this._setProps("endDate", date);
    return this;
  }

  /**
   * 指定文本为粗体
   * @param {boolean} bool
   */
  bold(bool = true) {
    this._setProps("bold", bool);
    return this;
  }

  /**
   * 设置文本使用的字体
   * @param {{}} font JSBoxFont|{name: string, size: number,monospaced: boolean}
   */
  font(font) {
    this._setProps("font", font);
    return this;
  }

  /**
   * 指定文本最多支持的行数
   * @param {number} num
   */
  lineLimit(num) {
    this._setProps("lineLimit", num);
    return this;
  }

  /**
   * 当文本不足以显示时，iOS 可能会将字体缩小，该属性指定了最小可以接受的比例
   * @param {number} num 例如0.5
   */
  minimumScaleFactor(num) {
    this._setProps("minimumScaleFactor", num);
    return this;
  }
}

class Image extends BaseWidget {
  constructor() {
    super();
    this.type = "image";
  }

  /**
   * 图片
   * @param {{}} image JSBoxImage
   */
  image(image) {
    this._setProps("image", image);
    return this;
  }

  /**
   * 该方式使用 SF Symbols 显示一个图标
   * @param {string} symbol
   */
  symbol(symbol) {
    this._setProps("symbol", symbol);
    return this;
  }

  /**
   * 该方式直接使用文件路径来设置图片内容
   * @param {string} path
   */
  path(path) {
    this._setProps("path", path);
    return this;
  }

  /**
   * 该方式可以使用一个在线图片地址，或是一个 base64 格式的图片字符串
   * @param {string} uri
   */
  uri(uri) {
    this._setProps("uri", uri);
    return this;
  }

  /**
   * 指定图片是否可以被缩放
   * @param {boolean} bool
   */
  resizable(bool = true) {
    this._setProps("resizable", bool);
    return this;
  }

  /**
   * 图片是否以拉伸并被裁剪的方式填充满父视图
   * @param {boolean} bool
   */
  scaledToFill(bool = true) {
    this._setProps("scaledToFill", bool);
    return this;
  }

  /**
   * 图片是否以拉伸并保持内容的方式放入父视图内
   * @param {boolean} bool
   */
  scaledToFit(bool = true) {
    this._setProps("scaledToFit", bool);
    return this;
  }

  /**
   * 为图片指定 VoiceOver 是否禁用
   * @param {boolean} bool
   */
  accessibilityHidden(bool = true) {
    this._setProps("accessibilityHidden", bool);
    return this;
  }

  /**
   * 为图片指定 VoiceOver 标签
   * @param {boolean} bool
   */
  accessibilityLabel(bool = true) {
    this._setProps("accessibilityLabel", bool);
    return this;
  }

  /**
   * 为图片指定 VoiceOver 提示语
   * @param {boolean} bool
   */
  accessibilityHint(bool = true) {
    this._setProps("accessibilityHint", bool);
    return this;
  }
}

class Color extends BaseWidget {
  constructor() {
    super();
    this.type = "color";
  }

  /**
   * 颜色
   * @param {string|{}} param 只接受hexcode和$color
   */
  color(param) {
    this._setProps("color", param);
    return this;
  }

  /**
   * 使用 light 和 dark 分别指定浅色和深色的颜色
   * @param {string} hex
   */
  light(hex) {
    this._setProps("light", hex);
    return this;
  }

  /**
   * 使用 light 和 dark 分别指定浅色和深色的颜色
   * @param {string} hex
   */
  dark(hex) {
    this._setProps("dark", hex);
    return this;
  }
}

class Gradient extends BaseWidget {
  constructor() {
    super();
    this.type = "gradient";
  }

  /**
   * 使用 startPoint 和 endPoint 来指定起始和结束点
   * @param {{}} point JSBoxPoint
   */
  startPoint(point) {
    this._setProps("startPoint", point);
    return this;
  }

  /**
   * 使用 startPoint 和 endPoint 来指定起始和结束点
   * @param {{}} point JSBoxPoint
   */
  endPoint(point) {
    this._setProps("endPoint", point);
    return this;
  }

  /**
   * colors 和 locations 来决定每一段渐变的颜色和位置。
   * 注：locations 如果指定，数量必须和 colors 相等。
   * @param {number[]} arr
   */
  locations(arr) {
    this._setProps("locations", arr);
    return this;
  }

  /**
   * colors 和 locations 来决定每一段渐变的颜色和位置。
   * 注：locations 如果指定，数量必须和 colors 相等。
   * @param {obejct[]} arr JSBoxColor[]
   */
  colors(arr) {
    this._setProps("colors", arr);
    return this;
  }
}

class Hstack extends BaseWidget {
  constructor() {
    super();
    this.type = "hstack";
  }

  /**
   * alignment 使用 $widget.verticalAlignment 来指定控件的纵向对齐方式
   * 包括 leading, center, trailing
   * @param {number} num
   */
  alignment(num) {
    this._setProps("alignment", num);
    return this;
  }

  /**
   * 指定控件间的间距
   * @param {number} num
   */
  spacing(num) {
    this._setProps("spacing", num);
    return this;
  }
}

class Vstack extends BaseWidget {
  constructor() {
    super();
    this.type = "vstack";
  }

  /**
   * alignment 使用 $widget.horizontalAlignment 来指定控件的横向对齐方式
   * 包括 top, center, bottom, firstTextBaseline, lastTextBaseline
   * @param {number} num
   */
  alignment(num) {
    this._setProps("alignment", num);
    return this;
  }

  /**
   * 指定控件间的间距
   * @param {number} num
   */
  spacing(num) {
    this._setProps("spacing", num);
    return this;
  }
}

class Zstack extends BaseWidget {
  constructor() {
    super();
    this.type = "zstack";
  }

  /**
   *  使用 $widget.alignment 来指定控件的对齐方式
   * 包括center, leading, trailing, top, bottom, topLeading, topTrailing, bottomLeading, bottomTrailing
   * @param {number} num
   */
  alignment(num) {
    this._setProps("alignment", num);
    return this;
  }
}

class Spacer extends BaseWidget {
  constructor() {
    super();
    this.type = "spacer";
  }

  /**
   * 代表 spacer 最短的长度
   * @param {number} num
   */
  minLength(num) {
    this._setProps("minLength", num);
    return this;
  }
}

class Divider extends BaseWidget {
  constructor() {
    super();
    this.type = "divider";
  }
}

class Hgrid extends BaseWidget {
  constructor() {
    super();
    this.type = "hgrid";
  }

  /**
   * arr.length代表了有多少行
   * @param {{
   * alignment?: number,
   * spacing?: number,
   * fixed?: number,
   * flexible?: {minimum: number, maximum: number},
   * adaptive?: {minimum: number, maximum: number}
   * }[]} arr
   */
  rows(arr) {
    this._setProps("rows", arr);
    return this;
  }

  /**
   * 竖列之间的间隔
   * @param {number} num
   */
  spacing(num) {
    this._setProps("spacing", num);
    return this;
  }

  /**
   * 用的是$widget.verticalAlignment，包括 leading, center, trailing
   * @param {number} num
   */
  alignment(num) {
    this._setProps("alignment", num);
    return this;
  }
}

class Vgrid extends BaseWidget {
  constructor() {
    super();
    this.type = "vgrid";
  }

  /**
   * arr.length代表了有多少列
   * @param {{
   * alignment?: number,
   * spacing?: number,
   * fixed?: number,
   * flexible?: {minimum: number, maximum: number},
   * adaptive?: {minimum: number, maximum: number}
   * }[]} arr
   */
  columns(arr) {
    this._setProps("columns", arr);
    return this;
  }

  /**
   * 横行之间的间隔
   * @param {number} num
   */
  spacing(num) {
    this._setProps("spacing", num);
    return this;
  }

  /**
   * 用 $widget.horizontalAlignment
   * 包括 top, center, bottom, firstTextBaseline, lastTextBaseline
   * @param {number} num
   */
  alignment(num) {
    this._setProps("alignment", num);
    return this;
  }
}

module.exports = {
  Text,
  Image,
  Color,
  Gradient,
  Divider,
  Hstack,
  Vstack,
  Zstack,
  Spacer,
  Hgrid,
  Vgrid
};
