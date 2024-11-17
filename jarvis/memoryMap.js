import mmap from "@riaskov/mmap-io"
import fs from 'fs';


function createMemoryMap(filePath) {
  // Open the file for reading
  const fd = fs.openSync(filePath, 'r');
  
  // Get file stats to know the size
  const stats = fs.fstatSync(fd);
  
  // Create the memory mapping
  const buffer = mmap.map(
    stats.size,      // Size of the mapping
    mmap.PROT_READ,  // Protection flag - read only
    mmap.MAP_SHARED, // Sharing flag - shared memory
    fd,              // File descriptor
    0                // Offset
  );

  return buffer;
}

export default { createMemoryMap };