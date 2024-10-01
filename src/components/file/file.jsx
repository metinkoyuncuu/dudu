import React, { useState } from 'react';
import './file.css';

const File = ({
  accept = "*",
  multiple = false,
  maxSize = 5 * 1024 * 1024,
  label = "Choose a file",
  onFileChange,
  customStyles = {},
  previewWidth = "150px",
  previewHeight = "150px"
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter(file => file.size <= maxSize);

    if (validFiles.length !== files.length) {
      alert(`Some files exceed the maximum size of ${maxSize / (1024 * 1024)} MB`);
    }

    if (!multiple) {
      setSelectedFiles([validFiles[0]]);
      if (onFileChange) {
        onFileChange([validFiles[0]]);
      }
    } else {
      setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
      if (onFileChange) {
        onFileChange([...selectedFiles, ...validFiles]);
      }
    }
  };

  const renderPreview = (file) => {
    const fileType = file.type.split('/')[0];

    if (fileType === 'image') {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="preview-image"
          style={{ width: previewWidth, height: previewHeight }}
        />
      );
    }

    if (fileType === 'video') {
      return (
        <video
          controls
          src={URL.createObjectURL(file)}
          className="preview-video"
          style={{ width: previewWidth, height: previewHeight }}
        />
      );
    }

    return <p>File type not supported for preview</p>;
  };

  return (
    <div className="file-upload-container" style={customStyles.container}>
      <label className="file-label" style={customStyles.label}>
        {label}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          style={customStyles.input}
        />
      </label>
      {selectedFiles.length > 0 && (
        <div className="file-preview-container" style={customStyles.filePreview}>
          {selectedFiles.map((file, index) => (
            <div key={index} className="file-preview-item" style={{ marginRight: '10px' }}>
              {renderPreview(file)}
              <p>3{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default File;
