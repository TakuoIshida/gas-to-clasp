import { sample } from "./sample.ts";

function callSample() {
  console.log("callSample function called!");
  sample();
}

function callSample2() {
  console.log("callSample function called!");
  sample();
}

// gasからfunc指定で呼び出せるようにする
globalThis.callSample = callSample;
globalThis.callSample2 = callSample2;