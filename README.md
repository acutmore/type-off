
# Type Off

A TypeScript to JavaScript compiler in AssemblyScript.
A fork of https://github.com/alangpierce/sucrase.

## Requirements

Requires a WASI compliant WebAssembly runner to execute. E.g. [wasmtime](https://wasmtime.dev).

```sh
cat './input.ts' | wasmtime ./build/out.wasm > './output.js'
```

## Dev Dependencies

Node, Npm

```sh
npm install
```
