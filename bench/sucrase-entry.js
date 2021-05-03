/// <reference types="node" />
import * as sucrase from 'sucrase';

async function read(stream) {
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return Buffer.concat(chunks).toString('utf8');
}

const input = await read(process.stdin);
const { code } = sucrase.transform(input, { transforms: ['typescript'] });
process.stdout.write(code);
