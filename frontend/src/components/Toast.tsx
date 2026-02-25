import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div
      className="absolute bottom-24 left-4 right-4 z-50 toast-slide-in"
    >
      <div
        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, oklch(0.18 0.04 85 / 0.95) 0%, oklch(0.14 0.02 85 / 0.95) 100%)',
          border: '1px solid oklch(0.82 0.18 85 / 0.4)',
          boxShadow: '0 8px 32px oklch(0 0 0 / 0.5), 0 0 20px oklch(0.82 0.18 85 / 0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'oklch(0.82 0.18 85 / 0.2)' }}
        >
          <CheckCircle2 className="w-4 h-4" style={{ color: 'oklch(0.82 0.18 85)' }} />
        </div>
        <p className="text-sm font-semibold flex-1" style={{ color: 'oklch(0.9 0 0)' }}>
          {message}
        </p>
      </div>
    </div>
  );
}
