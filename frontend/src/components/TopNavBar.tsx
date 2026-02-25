import { ArrowLeft } from 'lucide-react';

interface TopNavBarProps {
  title: string;
  onBack: () => void;
  rightElement?: React.ReactNode;
}

export default function TopNavBar({ title, onBack, rightElement }: TopNavBarProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-4"
      style={{
        background: 'oklch(0.08 0 0)',
        borderBottom: '1px solid oklch(0.16 0 0)',
      }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-90"
        style={{
          background: 'oklch(0.14 0 0)',
          border: '1px solid oklch(0.22 0 0)',
        }}
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" style={{ color: 'oklch(0.82 0.18 85)' }} />
      </button>

      {/* Title */}
      <h2
        className="text-base font-bold tracking-widest uppercase"
        style={{
          color: 'oklch(0.82 0.18 85)',
          textShadow: '0 0 20px oklch(0.82 0.18 85 / 0.3)',
          letterSpacing: '0.12em',
        }}
      >
        {title}
      </h2>

      {/* Right element or spacer */}
      <div className="w-10 h-10 flex items-center justify-center">
        {rightElement || null}
      </div>
    </div>
  );
}
