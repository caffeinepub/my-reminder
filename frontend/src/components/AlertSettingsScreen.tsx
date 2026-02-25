import { useState } from 'react';
import { Bell, BellOff, Clock, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import TopNavBar from './TopNavBar';
import type { ReminderState } from '../App';

interface AlertSettingsScreenProps {
  destination: string;
  initialState: ReminderState;
  onBack: () => void;
  onSave: (state: ReminderState) => void;
}

const TIME_OPTIONS = [
  { value: 1, label: '1 min', sublabel: 'Just in time' },
  { value: 2, label: '2 min', sublabel: 'Quick prep' },
  { value: 5, label: '5 min', sublabel: 'Comfortable' },
];

export default function AlertSettingsScreen({ destination, initialState, onBack, onSave }: AlertSettingsScreenProps) {
  const [selectedTime, setSelectedTime] = useState<number>(initialState.alertTime);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(initialState.soundEnabled);

  const handleSave = () => {
    onSave({
      destination,
      alertTime: selectedTime,
      soundEnabled,
    });
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'oklch(0.08 0 0)' }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-4 pb-1">
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

      {/* Top nav */}
      <TopNavBar title="Alert Settings" onBack={onBack} />

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 pt-5 pb-6 gap-5 overflow-y-auto">
        {/* Destination summary card */}
        <div
          className="rounded-2xl p-4 animate-fade-in-up"
          style={{
            background: 'linear-gradient(135deg, oklch(0.14 0.02 85 / 0.8) 0%, oklch(0.12 0.01 85 / 0.6) 100%)',
            border: '1px solid oklch(0.82 0.18 85 / 0.2)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'oklch(0.82 0.18 85 / 0.15)' }}
            >
              <Bell className="w-5 h-5" style={{ color: 'oklch(0.82 0.18 85)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'oklch(0.82 0.18 85 / 0.7)' }}>
                Destination
              </p>
              <p className="text-sm font-bold truncate mt-0.5" style={{ color: 'oklch(0.92 0 0)' }}>
                {destination || 'Not set'}
              </p>
            </div>
          </div>
        </div>

        {/* Time before arrival section */}
        <div className="animate-fade-in-up-delay-1">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Clock className="w-4 h-4" style={{ color: 'oklch(0.82 0.18 85 / 0.7)' }} />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'oklch(0.82 0.18 85)' }}>
              Remind Me Before Arrival
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {TIME_OPTIONS.map((option) => {
              const isSelected = selectedTime === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedTime(option.value)}
                  className="flex flex-col items-center justify-center py-4 px-2 rounded-2xl transition-all duration-200 active:scale-95 relative overflow-hidden"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, oklch(0.82 0.18 85) 0%, oklch(0.75 0.16 80) 100%)'
                      : 'oklch(0.14 0 0)',
                    border: isSelected
                      ? '1.5px solid oklch(0.88 0.2 85 / 0.5)'
                      : '1.5px solid oklch(0.22 0 0)',
                    boxShadow: isSelected ? '0 4px 20px oklch(0.82 0.18 85 / 0.3)' : 'none',
                  }}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'oklch(0.1 0 0 / 0.7)' }} />
                    </div>
                  )}
                  <span
                    className="text-2xl font-black"
                    style={{ color: isSelected ? 'oklch(0.1 0 0)' : 'oklch(0.82 0.18 85)' }}
                  >
                    {option.value}
                  </span>
                  <span
                    className="text-xs font-bold mt-0.5"
                    style={{ color: isSelected ? 'oklch(0.15 0 0)' : 'oklch(0.55 0 0)' }}
                  >
                    min
                  </span>
                  <span
                    className="text-xs mt-1 font-medium"
                    style={{ color: isSelected ? 'oklch(0.2 0 0 / 0.8)' : 'oklch(0.4 0 0)' }}
                  >
                    {option.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sound toggle section */}
        <div className="animate-fade-in-up-delay-2">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Volume2 className="w-4 h-4" style={{ color: 'oklch(0.82 0.18 85 / 0.7)' }} />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'oklch(0.82 0.18 85)' }}>
              Notification
            </h3>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid oklch(0.2 0 0)', background: 'oklch(0.12 0 0)' }}
          >
            {/* Sound alert row */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-full flex items-center gap-4 px-4 py-4 transition-all duration-150 active:scale-[0.99]"
              style={{ borderBottom: '1px solid oklch(0.18 0 0)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: soundEnabled ? 'oklch(0.82 0.18 85 / 0.15)' : 'oklch(0.18 0 0)',
                }}
              >
                {soundEnabled
                  ? <Volume2 className="w-5 h-5" style={{ color: 'oklch(0.82 0.18 85)' }} />
                  : <VolumeX className="w-5 h-5" style={{ color: 'oklch(0.4 0 0)' }} />
                }
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold" style={{ color: 'oklch(0.88 0 0)' }}>
                  Sound Alert
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'oklch(0.45 0 0)' }}>
                  {soundEnabled ? 'Play sound when reminder triggers' : 'Silent notification only'}
                </p>
              </div>
              {/* Custom toggle */}
              <div
                className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0"
                style={{
                  background: soundEnabled
                    ? 'linear-gradient(135deg, oklch(0.82 0.18 85) 0%, oklch(0.75 0.16 80) 100%)'
                    : 'oklch(0.22 0 0)',
                  boxShadow: soundEnabled ? '0 0 12px oklch(0.82 0.18 85 / 0.4)' : 'none',
                }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300"
                  style={{
                    background: soundEnabled ? 'oklch(0.1 0 0)' : 'oklch(0.45 0 0)',
                    left: soundEnabled ? 'calc(100% - 22px)' : '2px',
                    boxShadow: '0 1px 4px oklch(0 0 0 / 0.3)',
                  }}
                />
              </div>
            </button>

            {/* Vibration row */}
            <div className="flex items-center gap-4 px-4 py-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'oklch(0.82 0.18 85 / 0.15)' }}
              >
                <Bell className="w-5 h-5" style={{ color: 'oklch(0.82 0.18 85)' }} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold" style={{ color: 'oklch(0.88 0 0)' }}>
                  Vibration
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'oklch(0.45 0 0)' }}>
                  Always enabled
                </p>
              </div>
              <div
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'oklch(0.82 0.18 85 / 0.15)',
                  color: 'oklch(0.82 0.18 85)',
                }}
              >
                ON
              </div>
            </div>
          </div>
        </div>

        {/* Summary preview */}
        <div
          className="rounded-2xl p-4 animate-fade-in-up-delay-3"
          style={{
            background: 'oklch(0.12 0 0)',
            border: '1px solid oklch(0.2 0 0)',
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'oklch(0.45 0 0)' }}>
            Reminder Summary
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'oklch(0.82 0.18 85 / 0.15)', color: 'oklch(0.82 0.18 85)' }}
            >
              📍 {destination || 'No destination'}
            </span>
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'oklch(0.82 0.18 85 / 0.15)', color: 'oklch(0.82 0.18 85)' }}
            >
              ⏱ {selectedTime} min before
            </span>
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'oklch(0.82 0.18 85 / 0.15)', color: 'oklch(0.82 0.18 85)' }}
            >
              {soundEnabled ? '🔔 Sound on' : '🔕 Silent'}
            </span>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="px-4 pb-8 pt-2">
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl font-bold text-base tracking-wide uppercase transition-all duration-200 active:scale-[0.97] relative overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, oklch(0.82 0.18 85) 0%, oklch(0.75 0.16 80) 100%)',
            color: 'oklch(0.1 0 0)',
            boxShadow: '0 4px 24px oklch(0.82 0.18 85 / 0.35), 0 1px 0 oklch(0.9 0.2 85 / 0.3) inset',
            letterSpacing: '0.08em',
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Save Reminder
          </span>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, oklch(0.9 0.2 85 / 0.2) 0%, transparent 60%)' }}
          />
        </button>
      </div>
    </div>
  );
}
