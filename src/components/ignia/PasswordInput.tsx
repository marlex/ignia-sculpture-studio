import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  fontFamily: "Hanken Grotesk, sans-serif",
  fontWeight: 400,
  color: "#121212",
  fontSize: 16,
  padding: "0 0 8px",
  borderRadius: 0,
};

const toggleStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  padding: "0 0 8px",
  cursor: "pointer",
  color: "#666",
  display: "flex",
  alignItems: "center",
};

export const PasswordInput = ({ id, value, onChange, required, minLength, autoComplete }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #121212" }}>
      <input
        id={id}
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        style={fieldStyle}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        style={toggleStyle}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};
