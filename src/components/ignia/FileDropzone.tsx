import { useRef, useState } from "react";

type FileDropzoneProps = {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label: string;
  hint?: string;
};

// Click-to-browse and drag-and-drop in one control. onFiles is called
// with whatever was just picked/dropped — the caller decides whether
// to append or replace, so this stays a dumb input.
export const FileDropzone = ({ accept, multiple, onFiles, label, hint }: FileDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (list: FileList | null) => {
    const files = Array.from(list ?? []);
    if (files.length) onFiles(files);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      style={{
        border: `1px dashed ${dragOver ? "#121212" : "#ccc"}`,
        background: dragOver ? "#F7F7F5" : "transparent",
        borderRadius: 2,
        padding: "28px 16px",
        textAlign: "center",
        cursor: "pointer",
        transition: "border-color 150ms, background 150ms",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
        style={{ display: "none" }}
      />
      <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 500, fontSize: 14, color: "#121212", margin: 0 }}>
        {label}
      </p>
      {hint && (
        <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, fontSize: 13, color: "#999", margin: "4px 0 0" }}>
          {hint}
        </p>
      )}
    </div>
  );
};
