import React, { useState } from 'react';
import File from './file';

const FileDemo = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFilesChange = (files) => {
    setUploadedFiles(files);
    console.log('Selected files:', files);
  };

  return (
    <div>
      <h2>Upload Files:</h2>
      <File
        accept=".png,.jpg,.jpeg,.mp4"
        multiple={false}
        maxSize={2 * 1024 * 1024}
        label="Resim Yükle"
        onFileChange={handleFilesChange}
        previewWidth="120px"
        previewHeight="120px"
        customStyles={{
          container: { margin: '20px 0', width: '40%' },
          label: { backgroundColor: 'red', padding: '10px', cursor: 'pointer' },
          input: { display: 'none' },
          filePreview: { marginTop: '10px' },
          fileItem: { color: '#333' }
        }}
      />
    </div>
  );
};

export default FileDemo;
