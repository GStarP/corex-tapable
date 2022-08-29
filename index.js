import { SyncHook } from "./SyncHook.js";

const hook = new SyncHook(["arg1", "arg2"]);

hook.tap("event1", (arg1, arg2) => {
  console.log("event1:", arg1, arg2);
});

hook.call("hxw", "zzn");
