export class HookCodeFactory {
  constructor(config) {
    this.config = config;
    this.options = undefined;
    this._args = undefined;
  }

  // 设置 _x
  setup(instance, options) {
    instance._x = options.taps.map((tap) => tap.fn);
  }

  // 创建执行函数
  create(options) {
    this.init(options);
    let fn;
    /**
     * function fn(arg1, arg2) {
     *   "use strict";
     *   var _x = this._x;
     *   var _fn0 = _x[0];
     *   _fn0(arg1, arg2);
     *   var _fn1 = _x[1];
     *   _fn1(arg1, arg2);
     * }
     */
    fn = new Function(
      this._args.join(","),
      `"use strict";
      var _x = this._x;
      ${this.content()}
      `
    );
    this.deinit();
    return fn;
  }

  init(options) {
    this.options = options;
    this._args = [...options.args];
  }

  deinit() {
    this.options = undefined;
    this._args = undefined;
  }

  // 由具体 HookCodeFactory 类实现
  content(options) {
    throw new Error("HookCodeFactory.content should be overridden");
  }
}
