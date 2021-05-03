
# Type Off

A TypeScript to JavaScript compiler in [AssemblyScript](https://www.assemblyscript.org).
A fork of https://github.com/alangpierce/sucrase

## Limitations

⚠️ Experimental. Do not use this. ⚠️

Stripped back to only remove TypeScript types,(and compile TypeScript enums into objects).

No support for classes, module transforms, JSX, Flow.

## Requirements

Requires a [WASI](https://wasi.dev) compliant WebAssembly runner to execute. E.g. [wasmtime](https://wasmtime.dev).

```sh
cat './input.ts' | wasmtime ./build/out.wasm > './output.js'
```

## Development

Node, Npm

```sh
npm install
npm run asbuild
```

## Experiment notes

Found in [./bench/benchmarks.md](./bench/benchmarks.md)
