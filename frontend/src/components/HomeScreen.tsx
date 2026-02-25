import { MapPin, Bell, Navigation } from 'lucide-react';
import type { ReminderState } from '../App';

interface HomeScreenProps {
  onSetDestination: () => void;
  savedReminder: ReminderState;
}

export default function HomeScreen({ onSetDestination, savedReminder }: HomeScreenProps) {
  const hasReminder = savedReminder.destination.trim().length > 0;

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'oklch(0.08 0 0)' }}>
      {/* Status bar simulation */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <span className="text-xs font-medium" style={{ color: 'oklch(0.55 0 0)' }}>9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5 items-end h-3">
            {[2, 3, 4, 5].map((h, i) => (
              <div key={i} className="w-1 rounded-sm" style={{ height: `${h * 2.5}px`, background: i < 3 ? 'oklch(0.82 0.18 85)' : 'oklch(0.35 0 0)' }} />
            ))}
          </div>
          <div className="w-4 h-2 rounded-sm border" style={{ borderColor: 'oklch(0.55 0 0)' }}>
            <div className="h-full rounded-sm" style={{ width: '70%', background: 'oklch(0.82 0.18 85)' }} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 pb-8 pt-4">
        {/* Hero section */}
        <div className="flex flex-col items-center flex-1 justify-center gap-6 w-full">
          {/* Logo */}
          <div className="animate-fade-in-up relative">
            <div
              className="w-28 h-28 rounded-3xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, oklch(0.18 0.04 85) 0%, oklch(0.12 0.02 85) 100%)',
                border: '1.5px solid oklch(0.82 0.18 85 / 0.4)',
                boxShadow: '0 0 40px oklch(0.82 0.18 85 / 0.2), inset 0 1px 0 oklch(0.82 0.18 85 / 0.15)',
              }}
            >
              <img
                src="/assets/generated/my-reminder-logo.dim_256x256.png"
                alt="MY REMINDER Logo"
                className="w-20 h-20 object-contain"
                onError={(e) => {
                  // Fallback if image doesn't load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Fallback icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Navigation
                  className="w-12 h-12"
                  style={{ color: 'oklch(0.82 0.18 85)', filter: 'drop-shadow(0 0 8px oklch(0.82 0.18 85 / 0.6))' }}
                />
              </div>
            </div>
            {/* Glow ring */}
            <div
              className="absolute -inset-2 rounded-3xl -z-10"
              style={{ background: 'radial-gradient(circle, oklch(0.82 0.18 85 / 0.12) 0%, transparent 70%)' }}
            />
          </div>

          {/* Title */}
          <div className="text-center animate-fade-in-up-delay-1">
            <h1
              className="text-4xl font-black tracking-widest uppercase"
              style={{
                color: 'oklch(0.82 0.18 85)',
                textShadow: '0 0 30px oklch(0.82 0.18 85 / 0.4)',
                letterSpacing: '0.15em',
              }}
            >
              MY REMINDER
            </h1>
            <p className="mt-2 text-sm font-medium tracking-wider uppercase" style={{ color: 'oklch(0.5 0 0)' }}>
              GPS Destination Alerts
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 w-full max-w-xs animate-fade-in-up-delay-2">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, oklch(0.82 0.18 85 / 0.3))' }} />
            <MapPin className="w-4 h-4" style={{ color: 'oklch(0.82 0.18 85 / 0.6)' }} />
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, oklch(0.82 0.18 85 / 0.3))' }} />
          </div>

          {/* Active reminder card */}
          {hasReminder && (
            <div
              className="w-full rounded-2xl p-4 animate-fade-in-up-delay-2"
              style={{
                background: 'linear-gradient(135deg, oklch(0.18 0.04 85 / 0.6) 0%, oklch(0.14 0.02 85 / 0.4) 100%)',
                border: '1px solid oklch(0.82 0.18 85 / 0.25)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'oklch(0.82 0.18 85 / 0.15)' }}
                >
                  <Bell className="w-4 h-4" style={{ color: 'oklch(0.82 0.18 85)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'oklch(0.82 0.18 85 / 0.7)' }}>
                    Active Reminder
                  </p>
                  <p className="text-sm font-semibold truncate" style={{ color: 'oklch(0.9 0 0)' }}>
                    {savedReminder.destination}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'oklch(0.5 0 0)' }}>
                    Alert {savedReminder.alertTime} min before arrival
                    {savedReminder.soundEnabled ? ' · Sound on' : ' · Sound off'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Feature pills */}
          {!hasReminder && (
            <div className="flex gap-2 flex-wrap justify-center animate-fade-in-up-delay-2">
              {['GPS Tracking', 'Smart Alerts', 'Easy Setup'].map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'oklch(0.14 0 0)',
                    border: '1px solid oklch(0.25 0 0)',
                    color: 'oklch(0.6 0 0)',
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="w-full space-y-3 animate-fade-in-up-delay-3">
          {/* Main CTA button */}
          <button
            onClick={onSetDestination}
            className="w-full py-4 rounded-2xl font-bold text-base tracking-wide uppercase transition-all duration-200 active:scale-[0.97] relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, oklch(0.82 0.18 85) 0%, oklch(0.75 0.16 80) 100%)',
              color: 'oklch(0.1 0 0)',
              boxShadow: '0 4px 24px oklch(0.82 0.18 85 / 0.35), 0 1px 0 oklch(0.9 0.2 85 / 0.3) inset',
              letterSpacing: '0.08em',
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              {hasReminder ? 'Update Destination' : 'Set Destination'}
            </span>
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, oklch(0.9 0.2 85 / 0.2) 0%, transparent 60%)' }}
            />
          </button>

          {/* Tagline */}
          <p className="text-center text-xs" style={{ color: 'oklch(0.38 0 0)' }}>
            Never miss your stop again
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 text-center">
        <p className="text-xs" style={{ color: 'oklch(0.3 0 0)' }}>
          Built with{' '}
          <span style={{ color: 'oklch(0.82 0.18 85)' }}>♥</span>
          {' '}using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'my-reminder-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors"
            style={{ color: 'oklch(0.82 0.18 85 / 0.7)' }}
          >
            caffeine.ai
          </a>
          {' '}· © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
