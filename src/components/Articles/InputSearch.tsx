import React from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (value: string) => void;
}
function InputSearch({ value, onChange }: Props) {
  return (
    <div className="relative md:w-[33%] shadow-lg rounded-lg">
      <input
        type="text"
        placeholder="Search articles..."
        className="rounded-lg border-2 border-accent px-5 pr-12 py-2 focus:border-primary outline-none transition-all duration-75 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] text-xl pointer-events-none" />
    </div>
  );
}

export default InputSearch;
