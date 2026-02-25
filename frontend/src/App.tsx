import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import DestinationInputScreen from './components/DestinationInputScreen';
import AlertSettingsScreen from './components/AlertSettingsScreen';
import Toast from './components/Toast';

export type Screen = 'home' | 'destination' | 'alert';

export interface ReminderState {
  destination: string;
  alertTime: number; // minutes
  soundEnabled: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [reminderState, setReminderState] = useState<ReminderState>({
    destination: '',
    alertTime: 5,
    soundEnabled: true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleSaveReminder = (state: ReminderState) => {
    setReminderState(state);
    showToast(`✓ Reminder set! Alert ${state.alertTime} min before arrival`);
    setTimeout(() => navigateTo('home'), 400);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-appbg">
      {/* Desktop outer glow frame */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-radial pointer-events-none" 
           style={{ background: 'radial-gradient(ellipse at center, oklch(0.82 0.18 85 / 0.04) 0%, transparent 70%)' }} 
      />

      {/* Mobile frame wrapper */}
      <div
        className="relative w-full sm:max-w-[390px] min-h-screen sm:min-h-0 sm:h-[844px] overflow-hidden flex flex-col"
        style={{
          background: 'oklch(0.08 0 0)',
          boxShadow: '0 0 0 1px oklch(0.22 0 0), 0 25px 80px oklch(0 0 0 / 0.9), 0 0 60px oklch(0.82 0.18 85 / 0.06)',
          borderRadius: 'clamp(0px, 2vw, 40px)',
        }}
      >
        {/* Screen content */}
        <div className="flex-1 relative overflow-hidden">
          {currentScreen === 'home' && (
            <HomeScreen
              key="home"
              onSetDestination={() => navigateTo('destination')}
              savedReminder={reminderState}
            />
          )}
          {currentScreen === 'destination' && (
            <DestinationInputScreen
              key="destination"
              initialDestination={reminderState.destination}
              onBack={() => navigateTo('home')}
              onNext={(destination: string) => {
                setReminderState(prev => ({ ...prev, destination }));
                navigateTo('alert');
              }}
            />
          )}
          {currentScreen === 'alert' && (
            <AlertSettingsScreen
              key="alert"
              destination={reminderState.destination}
              initialState={reminderState}
              onBack={() => navigateTo('destination')}
              onSave={handleSaveReminder}
            />
          )}
        </div>

        {/* Toast notification */}
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </div>
  );
}
