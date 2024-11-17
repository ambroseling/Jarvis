const { MemoryMap } = require('bindings')('native_mmap');

class MemoryMapper {
    constructor(filepath) {
        this.map = new MemoryMap(filepath);
    }

    getBuffer() {
        return this.map.read();
    }

    close() {
        this.map.close();
    }
}

module.exports = MemoryMapper;