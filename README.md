
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

## Tweaks

Note: using TypeScript's [`checker.ts`](https://raw.githubusercontent.com/microsoft/TypeScript/master/src/compiler/checker.ts) 40K LOC source file as a test file.

### String Builder

Building up the final transformed output string as a series of `+=` appends took **4m30.594s**.
Replacing this with a string builder pattern using a pre-allocated backing ArrayBuffer
reduced this to **0m8.657s**.
