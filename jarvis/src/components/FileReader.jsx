import React, { useEffect, useState } from 'react';

const FileReader = () => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const readFile = async () => {
      try {
        const content = await window.electron.ipcRenderer.invoke(
          'read-memory-map', 
          '/path/to/your/file'
        );
        setFileContent(content);
      } catch (error) {
        console.error('Error reading memory mapped file:', error);
      }
    };

    readFile();
  }, []);

  return (
    <div>
      <h2>File Content:</h2>
      <pre>{fileContent}</pre>
    </div>
  );
};

export default FileReader;