import { Input } from "@/components/ui/input";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange }) => {
  const [otp, setOTP] = useState(value.padEnd(6, " ").split(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setOTP(value.padEnd(6, " ").split(""));
  }, [value]);

  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return;
    const newOTP = [...otp];
    newOTP[index] = digit;
    setOTP(newOTP);
    onChange(newOTP.join("").trim());

    if (digit !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === " ") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((digit, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          className="w-10 h-10 text-center bg-gray-800 text-white border-gray-700"
          value={digit === " " ? "" : digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
