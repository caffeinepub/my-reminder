import { useState } from 'react';
import { Search, MapPin, X, Navigation, ChevronRight } from 'lucide-react';
import TopNavBar from './TopNavBar';

interface DestinationInputScreenProps {
  initialDestination: string;
  onBack: () => void;
  onNext: (destination: string) => void;
}

const SUGGESTED_DESTINATIONS = [
  { name: 'Central Station', distance: '2.4 km', icon: '🚉' },
  { name: 'City Mall', distance: '5.1 km', icon: '🛍️' },
  { name: 'Airport Terminal 1', distance: '18.3 km', icon: '✈️' },
  { name: 'University Campus', distance: '3.7 km', icon: '🎓' },
];

export default function DestinationInputScreen({ initialDestination, onBack, onNext }: DestinationInputScreenProps) {
  const [destination, setDestination] = useState(initialDestination);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectSuggestion = (name: string) => {
    setDestination(name);
    setIsFocused(false);
  };

  const canProceed = destination.trim().length > 0;

  const filteredSuggestions = SUGGESTED_DESTINATIONS.filter(d =>
    destination.length === 0 || d.name.toLowerCase().includes(destination.toLowerCase())
  );

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
      <TopNavBar title="Set Destination" onBack={onBack} />

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 pt-4 pb-6 gap-4 overflow-y-auto">
        {/* Search bar */}
        <div className="animate-fade-in-up">
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200"
            style={{
              background: 'oklch(0.14 0 0)',
              border: `1.5px solid ${isFocused ? 'oklch(0.82 0.18 85 / 0.6)' : 'oklch(0.22 0 0)'}`,
              boxShadow: isFocused ? '0 0 0 3px oklch(0.82 0.18 85 / 0.1)' : 'none',
            }}
          >
            <Search
              className="w-5 h-5 flex-shrink-0"
              style={{ color: isFocused ? 'oklch(0.82 0.18 85)' : 'oklch(0.45 0 0)' }}
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 150)}
              placeholder="Search destination…"
              className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:font-normal"
              style={{
                color: 'oklch(0.9 0 0)',
                caretColor: 'oklch(0.82 0.18 85)',
              }}
            />
            {destination.length > 0 && (
              <button
                onClick={() => setDestination('')}
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90"
                style={{ background: 'oklch(0.22 0 0)' }}
              >
                <X className="w-3.5 h-3.5" style={{ color: 'oklch(0.55 0 0)' }} />
              </button>
            )}
          </div>
        </div>

        {/* Suggestions */}
        {(isFocused || destination.length === 0) && filteredSuggestions.length > 0 && (
          <div className="animate-fade-in-up-delay-1">
            <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: 'oklch(0.45 0 0)' }}>
              {destination.length === 0 ? 'Recent & Suggested' : 'Suggestions'}
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid oklch(0.2 0 0)', background: 'oklch(0.12 0 0)' }}
            >
              {filteredSuggestions.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleSelectSuggestion(item.name)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-150 active:scale-[0.98]"
                  style={{
                    borderBottom: index < filteredSuggestions.length - 1 ? '1px solid oklch(0.18 0 0)' : 'none',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'oklch(0.16 0 0)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                    style={{ background: 'oklch(0.18 0 0)' }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: 'oklch(0.88 0 0)' }}>
                      {item.name}
                    </p>
                    <p className="text-xs" style={{ color: 'oklch(0.45 0 0)' }}>
                      {item.distance} away
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'oklch(0.35 0 0)' }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Map preview */}
        <div className="animate-fade-in-up-delay-2 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: 'oklch(0.45 0 0)' }}>
            Map Preview
          </p>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: '1px solid oklch(0.22 0 0)',
              minHeight: '220px',
            }}
          >
            {/* Map image */}
            <img
              src="/assets/generated/map-preview-placeholder.dim_390x260.png"
              alt="Map preview"
              className="w-full h-full object-cover"
              style={{ minHeight: '220px' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />

            {/* Fallback map visualization */}
            <div
              className="absolute inset-0 flex flex-col"
              style={{ background: 'oklch(0.11 0.01 200)' }}
            >
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="oklch(0.82 0.18 85)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Road lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="oklch(0.2 0 0)" strokeWidth="8" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="oklch(0.16 0 0)" strokeWidth="6" />
                <line x1="30%" y1="0" x2="30%" y2="100%" stroke="oklch(0.2 0 0)" strokeWidth="6" />
                <line x1="30%" y1="0" x2="30%" y2="100%" stroke="oklch(0.16 0 0)" strokeWidth="4" />
                <line x1="70%" y1="0" x2="70%" y2="100%" stroke="oklch(0.2 0 0)" strokeWidth="5" />
                <line x1="70%" y1="0" x2="70%" y2="100%" stroke="oklch(0.16 0 0)" strokeWidth="3" />
                <line x1="0" y1="25%" x2="100%" y2="25%" stroke="oklch(0.18 0 0)" strokeWidth="4" />
                <line x1="0" y1="75%" x2="100%" y2="75%" stroke="oklch(0.18 0 0)" strokeWidth="4" />
              </svg>

              {/* Center pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex flex-col items-center">
                  {/* Pin shadow */}
                  <div
                    className="absolute bottom-0 w-6 h-2 rounded-full"
                    style={{ background: 'oklch(0 0 0 / 0.5)', filter: 'blur(4px)', transform: 'translateY(4px)' }}
                  />
                  {/* Pin body */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.88 0.2 85) 0%, oklch(0.75 0.16 80) 100%)',
                      boxShadow: '0 0 20px oklch(0.82 0.18 85 / 0.6), 0 4px 12px oklch(0 0 0 / 0.4)',
                    }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: 'oklch(0.1 0 0)' }} />
                  </div>
                  {/* Pin tail */}
                  <div
                    className="w-0 h-0"
                    style={{
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: '10px solid oklch(0.75 0.16 80)',
                      marginTop: '-2px',
                    }}
                  />
                </div>
              </div>

              {/* Destination label */}
              {destination && (
                <div
                  className="absolute bottom-4 left-4 right-4 px-3 py-2 rounded-xl"
                  style={{
                    background: 'oklch(0.1 0 0 / 0.9)',
                    border: '1px solid oklch(0.82 0.18 85 / 0.3)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'oklch(0.82 0.18 85)' }} />
                    <p className="text-xs font-semibold truncate" style={{ color: 'oklch(0.88 0 0)' }}>
                      {destination}
                    </p>
                  </div>
                </div>
              )}

              {/* Accuracy ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-20 h-20 rounded-full"
                  style={{
                    border: '1.5px solid oklch(0.82 0.18 85 / 0.25)',
                    background: 'oklch(0.82 0.18 85 / 0.05)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-4 pb-8 pt-2">
        <button
          onClick={() => canProceed && onNext(destination.trim())}
          disabled={!canProceed}
          className="w-full py-4 rounded-2xl font-bold text-base tracking-wide uppercase transition-all duration-200 active:scale-[0.97] relative overflow-hidden"
          style={{
            background: canProceed
              ? 'linear-gradient(135deg, oklch(0.82 0.18 85) 0%, oklch(0.75 0.16 80) 100%)'
              : 'oklch(0.18 0 0)',
            color: canProceed ? 'oklch(0.1 0 0)' : 'oklch(0.35 0 0)',
            boxShadow: canProceed ? '0 4px 24px oklch(0.82 0.18 85 / 0.3)' : 'none',
            letterSpacing: '0.08em',
            cursor: canProceed ? 'pointer' : 'not-allowed',
            border: canProceed ? 'none' : '1px solid oklch(0.25 0 0)',
          }}
        >
          <span className="flex items-center justify-center gap-2">
            Set Alert
            <ChevronRight className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  );
}
