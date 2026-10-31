export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-[70px] bg-surface-card border-b border-line">
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-1.5 text-content-primary">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <path
              d="M1.5 14.5V2l9.5 9 9.5-9v12.5"
              stroke="#A37B3E"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg font-semibold tracking-tight">maitre</span>
        </a>
        <span className="px-2 py-0.5 rounded-pill bg-content-primary text-white font-display text-[10px] font-semibold uppercase tracking-wider">
          Admin
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-sm text-content-secondary">Sevinc Əliyeva</span>
        <div className="w-8 h-8 rounded-full bg-[#F1EBE0] text-brand text-xs font-semibold flex items-center justify-center">
          NƏ
        </div>
      </div>
    </header>
  );
}
