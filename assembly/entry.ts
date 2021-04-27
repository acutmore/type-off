import 'wasi';
import { transform } from "./index";

// AssemblyScript WASI wrapper: stdout(transform(stdin()))
const bufferIn = new ArrayBuffer(2 ** 13);
const view = new DataView(bufferIn);
const count = process.stdin.read(bufferIn, 0);
view.setUint8(count + 1, 0);
const code = String.UTF8.decode(bufferIn, true);
const out = transform(code);
process.stdout.write(out.code);
