import fs from 'fs';
import pathLib from 'path';
import { WASI } from 'wasi';
import { fileURLToPath } from 'url';

const __dirname = pathLib.dirname(fileURLToPath(import.meta.url));

const wasi = new WASI();
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasmPath = pathLib.join(__dirname, '../build/out.wasm');

const wasm = await WebAssembly.compile(fs.readFileSync(wasmPath));
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);
