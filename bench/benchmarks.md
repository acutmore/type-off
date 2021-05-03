
## Input
[checker.ts](https://raw.githubusercontent.com/microsoft/TypeScript/master/src/compiler/checker.ts) 40K lines of TypeScript (_slightly modified as `namespace ts {...}` is not supported_ )

## Baselines

### esbuild

`time cat checker.ts | ./node_modules/.bin/esbuild --loader=ts > /dev/null`

0.031 seconds

### sucrase

`time cat checker.ts | node ./sucrase-entry.js > /dev/null`

0.979 seconds

## sucrase (AssemblyScriptified) attempts

`time cat checker.ts | wasmtime ../build/out.wasm > /dev/null`

## run 1

I was expecting it to be slower. But was still a lot slower than I was expecting. For a while I thought there was a bug getting it stuck in an infinite loop.

4 minutes 33 seconds

## run 2: use string-builder pattern

Building up the final transformed output string as a series of `+=` appends was a large bottleneck.
Replacing this with a string builder pattern using a pre-allocated backing ArrayBuffer. _commit: fd91c08b_

8.831 seconds

9.072 seconds using [wasmer](https://wasmer.io) instead

## run 3: pre-allocate Array<Token>

AssemblyScript arrays have [an issue](https://github.com/AssemblyScript/assemblyscript/pull/1841) (with an unreleased fix) where they grow too slowly when new elements are added to the end. Pre-allocating the main array of Tokens avoids this.

0.657 seconds

## run 4: do not optimise for size shrinkLevel: 0

Only optimise for speed. Output grew from 86 KB to 97 KB.

0.318 seconds
