import { Hook } from "./Hook.js";
import { HookCodeFactory } from "./HookCodeFactory.js";

class SyncHookCodeFactory extends HookCodeFactory {
  // 生成执行函数主体代码
  content() {
    let code = "";
    for (let i = this.options.taps.length - 1; i >= 0; --i) {
      code += this.callTap(i);
    }
    return code;
  }
  // 生成单个回调语句（不同种类钩子回调语句不同）
  callTap(tapIndex) {
    let code = "";
    code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
    code += `_fn${tapIndex}(${this._args.join(",")});\n`;
    return code;
  }
}

const factory = new SyncHookCodeFactory();

export class SyncHook extends Hook {
  constructor(args = []) {
    super(args);
  }

  // 动态编译工作交给 HookCodeFactory
  compile(options) {
    factory.setup(this, options);
    return factory.create(options);
  }
}
