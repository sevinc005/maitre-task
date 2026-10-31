import { useEffect, useRef, useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
}

// yazdiqca her herfde sorgu getmesin deye debounce edirik
export function SearchInput({ value, onChange, placeholder, delay = 350 }: SearchInputProps) {
  const [text, setText] = useState(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // URL xaricden deyisende (geri duymesi ve s.) inputu sinxronlasdir
  useEffect(() => setText(value), [value]);

  useEffect(() => {
    if (text.trim() === value) return;
    const t = setTimeout(() => onChangeRef.current(text), delay);
    return () => clearTimeout(t);
  }, [text, value, delay]);

  return (
    <label className="flex items-center gap-2.5 h-12 px-4 rounded-pill border border-line bg-surface-card focus-within:border-brand transition-colors">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78736B" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        aria-label="Axtarış"
        className="flex-1 min-w-0 bg-transparent outline-none text-[15px] placeholder:text-content-secondary"
      />
    </label>
  );
}
