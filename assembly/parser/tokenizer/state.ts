import { Loc } from "../traverser/base";
import {Token} from "./index";
import {ContextualKeyword} from "./keywords";
import {TokenType, TokenType as tt} from "./types";

// export class Scope {
//   startTokenIndex: number;
//   endTokenIndex: number;
//   isFunctionScope: boolean;

//   constructor(startTokenIndex: number, endTokenIndex: number, isFunctionScope: boolean) {
//     this.startTokenIndex = startTokenIndex;
//     this.endTokenIndex = endTokenIndex;
//     this.isFunctionScope = isFunctionScope;
//   }
// }

export class StateSnapshot {
  constructor(
    // readonly potentialArrowAt: number,
    readonly potentialArrowAt: i32,
    // readonly noAnonFunctionType: boolean,
    // readonly tokensLength: number,
    readonly tokensLength: i32,
    // readonly scopesLength: number,
    // readonly pos: number,
    readonly pos: i32,
    readonly type: TokenType,
    readonly contextualKeyword: ContextualKeyword,
    // readonly start: number,
    readonly start: i32,
    // readonly end: number,
    readonly end: i32,
    readonly isType: boolean,
    // readonly scopeDepth: number,
    // readonly error: Error | null,
    readonly error: ErrorWithPos | null,
  ) {}
}

// AS(static-props)
export class ErrorWithPos {
  public pos: i32 = -1;
  public loc: Loc | null = null;
  constructor(public message: string) {}
}

export default class State {
//   // Used to signify the start of a potential arrow function
  // potentialArrowAt: number = -1;
  potentialArrowAt: i32 = -1;

//   // Used by Flow to handle an edge case involving function type parsing.
//   noAnonFunctionType: boolean = false;

  // Token store.
  tokens: Array<Token> = new Array<Token>(300_000);

//   // Array of all observed scopes, ordered by their ending position.
//   scopes: Array<Scope> = [];

  // The current position of the tokenizer in the input.
  // pos: number = 0;
  pos: i32 = 0;

  // Information about the current token.
  type: TokenType = tt.eof;
  contextualKeyword: ContextualKeyword = ContextualKeyword.NONE;
  // start: number = 0;
  start: i32 = 0;
  // end: number = 0;
  end: i32 = 0;

  isType: boolean = false;
//   scopeDepth: number = 0;

//   /**
//    * If the parser is in an error state, then the token is always tt.eof and all functions can
//    * keep executing but should be written so they don't get into an infinite loop in this situation.
//    *
//    * This approach, combined with the ability to snapshot and restore state, allows us to implement
//    * backtracking without exceptions and without needing to explicitly propagate error states
//    * everywhere.
//    */
  error: ErrorWithPos | null = null;

  constructor() {
    // AS(array.push growth bug #1841) - pre-allocate helps avoids
    this.tokens.length = 0;
  }

  snapshot(): StateSnapshot {
    return new StateSnapshot(
      this.potentialArrowAt,
      // this.noAnonFunctionType,
      this.tokens.length,
      // this.scopes.length,
      this.pos,
      this.type,
      this.contextualKeyword,
      this.start,
      this.end,
      this.isType,
      // this.scopeDepth,
      this.error,
    );
  }

  restoreFromSnapshot(snapshot: StateSnapshot): void {
    this.potentialArrowAt = snapshot.potentialArrowAt;
    // this.noAnonFunctionType = snapshot.noAnonFunctionType;
    this.tokens.length = snapshot.tokensLength;
    // this.scopes.length = snapshot.scopesLength;
    this.pos = snapshot.pos;
    this.type = snapshot.type;
    this.contextualKeyword = snapshot.contextualKeyword;
    this.start = snapshot.start;
    this.end = snapshot.end;
    this.isType = snapshot.isType;
    // this.scopeDepth = snapshot.scopeDepth;
    this.error = snapshot.error;
  }
}
