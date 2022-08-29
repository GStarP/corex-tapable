export class Hook {
  constructor(args = []) {
    // 声明钩子参数
    this._args = args;
    // 保存注册内容
    this.taps = [];
  }

  tap(name, fn) {
    // 每次注册钩子都要还原 call
    this.call = this._call;
    this.taps.push({
      name,
      fn,
    });
  }

  // call 的时候先进入 _call 生成执行函数
  _call(...args) {
    this.call = this._createCall();
    return this.call(...args);
  }

  // 未还原时，call 就是真正的执行函数
  call = this._call;

  // 动态编译生成真正的 call 函数
  _createCall() {
    return this.compile({
      args: this._args,
      taps: this.taps,
    });
  }

  // 由具体 Hook 类实现
  compile(options) {
    throw new Error("Hook.compile should be overridden");
  }
}
