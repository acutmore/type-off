import 'wasi';
import { transform } from "./index";

// AssemblyScript WASI wrapper: stdout(transform(stdin()))
const bufferIn = new ArrayBuffer(2 ** 22);
const view = new DataView(bufferIn);
let offset = 0;
for (;;) {
    const count = process.stdin.read(bufferIn, offset);
    if (count === 0) {
        break;
    }
    offset += count;
}
view.setUint8(offset, 0);
const code = String.UTF8.decode(bufferIn, true);
const out = transform(code);
process.stdout.write(out.code);
