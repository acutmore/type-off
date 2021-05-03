
# Type Off

A TypeScript to JavaScript compiler in [AssemblyScript](https://www.assemblyscript.org).
A fork of https://github.com/alangpierce/sucrase

## Findings

Converting [40K lines of TypeScript](https://raw.githubusercontent.com/microsoft/TypeScript/master/src/compiler/checker.ts).

| Tool        | Time _*_    |
| ----------- | ----------- |
| esbuild     | 031 ms      |
| _this_      | 318 ms      |
| sucrase     | 979 ms      |

_\* times are collected from the shell. So include full time from the OS process start to exit._ Device: M1 MacBook Pro.

## Limitations

⚠️ Experimental. Do not use this. ⚠️

Stripped back to only remove TypeScript types, (and compile TypeScript enums into objects).

No support for classes, module transforms, JSX, Flow.

## Requirements

Requires a [WASI](https://wasi.dev) compliant WebAssembly runner to execute.

### Wasmtime

```sh
cat './input.ts' | wasmtime ./build/out.wasm > './output.js'
```

### Node.js

Node.js has (currently experimental) support. https://nodejs.org/api/wasi.html

```sh
cat './input.ts' | node --experimental-wasi-unstable-preview1 ./bench/node-wasi.js > './output.js'
```

## Development

Node, Npm

```sh
npm install
npm run asbuild
```

## Experiment notes

Found in [./bench/benchmarks.md](./bench/benchmarks.md)
