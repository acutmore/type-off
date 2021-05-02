import State from "../tokenizer/state";
import { ErrorWithPos } from "../tokenizer/state";
import {charCodes} from "../util/charcodes";

// export let isJSXEnabled: boolean;
// export let isTypeScriptEnabled: boolean;
// export let isFlowEnabled: boolean;
export let state: State;
export let input: string;
// export let nextContextId: number;

// export function getNextContextId(): number {
//   return nextContextId++;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function augmentError(error: any): any {
export function augmentError(error: ErrorWithPos): any {
//   if ("pos" in error) {
    const loc = locationForIndex(error.pos);
    error.message += ` (${loc.line}:${loc.column})`;
    error.loc = loc;
  // }
  return error;
}

export class Loc {
  // line: number;
  line: i32;
  // column: number;
  column: i32;
  // constructor(line: number, column: number) {
  constructor(line: i32, column: i32) {
    this.line = line;
    this.column = column;
  }
}

// export function locationForIndex(pos: number): Loc {
export function locationForIndex(pos: i32): Loc {
  let line = 1;
  let column = 1;
  for (let i = 0; i < pos; i++) {
    if (input.charCodeAt(i) === charCodes.lineFeed) {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return new Loc(line, column);
}

export function initParser(
  inputCode: string,
//   isJSXEnabledArg: boolean,
//   isTypeScriptEnabledArg: boolean,
//   isFlowEnabledArg: boolean,
): void {
  input = inputCode;
  state = new State();
//   nextContextId = 1;
//   isJSXEnabled = isJSXEnabledArg;
//   isTypeScriptEnabled = isTypeScriptEnabledArg;
//   isFlowEnabled = isFlowEnabledArg;
}
