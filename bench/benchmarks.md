
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

4 minutes 30 seconds

## run 2: use string-builder pattern

8.831 seconds

9.072 seconds using wasmer instead
