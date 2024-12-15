import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./textEditor.css"; // Import your custom CSS

const TextEditor = ({ widgetVar, varName, value, height, width }) => {
  const [editorValue, setEditorValue] = useState(value || "");

  const handleChange = (content) => {
    setEditorValue(content);
    if (widgetVar) {
      window[widgetVar] = content; // Mocking widgetVar behavior
    }
    if (varName) {
      window[varName] = content; // Mocking var behavior
    }
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <ReactQuill
        value={editorValue} 
        onChange={handleChange}
        style={{
          height,
          width: width || "100%", // Only adjust width of the editor
          position: "absolute", // Absolute positioning to prevent affecting layout
          top: 0,
          left: 0,
        }}
        modules={{
          toolbar: [
            [{ font: [] }, { size: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "background",
          "align",
          "blockquote",
          "list",
          "bullet",
          "link",
          "image",
        ]}
      />
    </div>
  );
};

export default TextEditor;
