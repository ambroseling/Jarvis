const MemoryMapper = require('./');
const fs = require('fs');

// Create a larger test file
const testFile = 'test.dat';
const buffer = Buffer.alloc(1024); // 1KB file
for (let i = 0; i < buffer.length; i++) {
    buffer[i] = i % 256;
}
fs.writeFileSync(testFile, buffer);

try {
    const mapper = new MemoryMapper(testFile);
    const buffer1 = mapper.getBuffer();
    const buffer2 = mapper.getBuffer();

    const view1 = new Uint8Array(buffer1);
    const view2 = new Uint8Array(buffer2);

    console.log('Initial value:', view1[0]);
    console.log('Initial value:', view1[1]);
    console.log('Initial value:', view1[2]);
    mapper.close();
} catch (error) {
    console.error('Error:', error);
}

// Clean up test file
fs.unlinkSync(testFile);