// Timer/Stopwatch Mini-App Bundle
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function TimerApp() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'stopwatch' | 'timer'>('stopwatch');
  const [timerMinutes, setTimerMinutes] = useState(5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (mode === 'timer' && prevTime <= 0) {
            setIsRunning(false);
            return 0;
          }
          return mode === 'stopwatch' ? prevTime + 1 : prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const start = () => {
    if (mode === 'timer' && time === 0) {
      setTime(timerMinutes * 60);
    }
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(mode === 'stopwatch' ? 0 : timerMinutes * 60);
  };

  const adjustTimer = (minutes: number) => {
    if (!isRunning) {
      const newMinutes = Math.max(1, Math.min(60, minutes));
      setTimerMinutes(newMinutes);
      setTime(newMinutes * 60);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⏱️ Timer & Stopwatch</Text>
        <Text style={styles.headerSubtitle}>
          {mode === 'stopwatch' ? 'Track elapsed time' : 'Countdown timer'}
        </Text>
      </View>
      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'stopwatch' && styles.modeButtonActive]}
          onPress={() => {
            setMode('stopwatch');
            reset();
          }}
        >
          <Text style={[styles.modeButtonText, mode === 'stopwatch' && styles.modeButtonTextActive]}>
            Stopwatch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'timer' && styles.modeButtonActive]}
          onPress={() => {
            setMode('timer');
            reset();
          }}
        >
          <Text style={[styles.modeButtonText, mode === 'timer' && styles.modeButtonTextActive]}>
            Timer
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.displayContainer}>
        <Text style={[styles.timeDisplay, time === 0 && mode === 'timer' && styles.timeDisplayWarning]}>
          {formatTime(time)}
        </Text>
        {mode === 'timer' && (
          <View style={styles.timerControls}>
            <TouchableOpacity
              style={[
                styles.adjustButton,
                isRunning && styles.adjustButtonDisabled,
                { pointerEvents: isRunning ? 'none' : 'auto' },
              ]}
              onPress={() => adjustTimer(timerMinutes - 1)}
            >
              <Text style={[styles.adjustButtonText, isRunning && styles.adjustButtonTextDisabled]}>
                −
              </Text>
            </TouchableOpacity>
            <Text style={styles.timerMinutesText}>{timerMinutes} min</Text>
            <TouchableOpacity
              style={[
                styles.adjustButton,
                isRunning && styles.adjustButtonDisabled,
                { pointerEvents: isRunning ? 'none' : 'auto' },
              ]}
              onPress={() => adjustTimer(timerMinutes + 1)}
            >
              <Text style={[styles.adjustButtonText, isRunning && styles.adjustButtonTextDisabled]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.controlsContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={start} activeOpacity={0.8}>
            <Text style={styles.startButtonText}>▶ Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.pauseButton} onPress={pause} activeOpacity={0.8}>
            <Text style={styles.pauseButtonText}>⏸ Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.resetButton} onPress={reset} activeOpacity={0.8}>
          <Text style={styles.resetButtonText}>↻ Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    paddingTop: 28,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
    color: '#212529',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6c757d',
    fontWeight: '500',
  },
  modeSelector: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    gap: 12,
  },
  modeButton: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modeButtonActive: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  modeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#6c757d',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8f9fa',
  },
  timeDisplay: {
    fontSize: 80,
    fontWeight: '200',
    color: '#212529',
    fontVariant: ['tabular-nums'],
    letterSpacing: -2,
  },
  timeDisplayWarning: {
    color: '#ff6b6b',
    fontWeight: '300',
  },
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    gap: 24,
  },
  adjustButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  adjustButtonDisabled: {
    opacity: 0.5,
  },
  adjustButtonText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4a90e2',
  },
  adjustButtonTextDisabled: {
    color: '#adb5bd',
  },
  timerMinutesText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#495057',
    minWidth: 90,
    textAlign: 'center',
  },
  controlsContainer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  startButton: {
    flex: 1,
    height: 60,
    backgroundColor: '#50c878',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#50c878',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pauseButton: {
    flex: 1,
    height: 60,
    backgroundColor: '#ffa500',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ffa500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  pauseButtonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  resetButton: {
    flex: 1,
    height: 60,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  resetButtonText: {
    color: '#495057',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export default TimerApp;

