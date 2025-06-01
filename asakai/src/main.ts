import { sample } from "./sample.ts";

// GASから参照したい変数はglobalオブジェクトに渡してあげる必要がある
(global as any).sample = sample;