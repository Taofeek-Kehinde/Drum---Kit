import { useState, useEffect, useRef } from 'react';
import '../DrumKit.css';
import kickSound from '../assets/sounds/kick.wav';
import snareSound from '../assets/sounds/snare.wav';
import hihatClosedSound from '../assets/sounds/hihat-closed.mp3';
import hihatOpenSound from '../assets/sounds/hihat-open.mp3';
import tomHighSound from '../assets/sounds/tom-high.mp3';
import tomMidSound from '../assets/sounds/tom-mid.mp3';
import tomLowSound from '../assets/sounds/tom-low.mp3';
import crashSound from '../assets/sounds/crash.mp3';
import rideSound from '../assets/sounds/roll.mp3';

type DrumPad = {
  id: string;
  key: string;
  label: string;
  soundName: string;
  soundFile: string;
  keyCode: number;
  color: string;
};

const DrumKit = () => {
  // Using local drum samples from src/assets/sounds/ folder
  const drumPads: DrumPad[] = [
    {
      id: 'kick',
      key: 'Q',
      label: 'Q',
      soundName: 'Kick Drum',
      soundFile: kickSound,
      keyCode: 81,
      color: '#FF6B6B',
    },
    {
      id: 'snare',
      key: 'W',
      label: 'W',
      soundName: 'Snare Drum',
      soundFile: snareSound,
      keyCode: 87,
      color: '#4ECDC4',
    },
    {
      id: 'hihat-closed',
      key: 'E',
      label: 'E',
      soundName: 'Closed Hi-Hat',
      soundFile: hihatClosedSound,
      keyCode: 69,
      color: '#FFD166',
    },
    {
      id: 'hihat-open',
      key: 'A',
      label: 'A',
      soundName: 'Open Hi-Hat',
      soundFile: hihatOpenSound,
      keyCode: 65,
      color: '#06D6A0',
    },
    {
      id: 'tom-high',
      key: 'S',
      label: 'S',
      soundName: 'High Tom',
      soundFile: tomHighSound,
      keyCode: 83,
      color: '#118AB2',
    },
    {
      id: 'tom-mid',
      key: 'D',
      label: 'D',
      soundName: 'Mid Tom',
      soundFile: tomMidSound,
      keyCode: 68,
      color: '#073B4C',
    },
    {
      id: 'tom-low',
      key: 'Z',
      label: 'Z',
      soundName: 'Floor Tom',
      soundFile: tomLowSound,
      keyCode: 90,
      color: '#EF476F',
    },
    {
      id: 'crash',
      key: 'X',
      label: 'X',
      soundName: 'Crash Cymbal',
      soundFile: crashSound,
      keyCode: 88,
      color: '#7209B7',
    },
    {
      id: 'ride',
      key: 'C',
      label: 'C',
      soundName: 'Ride Cymbal',
      soundFile: rideSound,
      keyCode: 67,
      color: '#F15BB5',
    },
  ];

  // State declarations
  const [activePad, setActivePad] = useState<string | null>(null);
  const [currentSound, setCurrentSound] = useState<string>('');
  const [volume, setVolume] = useState<number>(0.7);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedSequence, setRecordedSequence] = useState<
    { sound: string; time: number }[]
  >([]);
  const [isPlayingRecording, setIsPlayingRecording] = useState<boolean>(false);
  const [powerOn, setPowerOn] = useState<boolean>(true);
  const [useHighQuality, setUseHighQuality] = useState<boolean>(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Use different sound sets
  // const drumPads = useHighQuality ? initialDrumPads : mixkitDrumPads;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!powerOn) return;

      const key = event.key.toUpperCase();
      const drumPad = drumPads.find((pad) => pad.key === key);

      if (drumPad) {
        playSound(drumPad);

        if (isRecording) {
          setRecordedSequence((prev) => [
            ...prev,
            {
              sound: drumPad.soundName,
              time: Date.now(),
            },
          ]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [powerOn, isRecording, drumPads]);

  const playSound = (drumPad: DrumPad) => {
    if (!powerOn) return;

    setActivePad(drumPad.id);
    setCurrentSound(drumPad.soundName);

    if (audioRefs.current[drumPad.id]) {
      audioRefs.current[drumPad.id].currentTime = 0;
      audioRefs.current[drumPad.id].volume = volume;
      audioRefs.current[drumPad.id]
        .play()
        .catch((e) => console.log('Audio play failed:', e));
    }

    setTimeout(() => {
      setActivePad(null);
    }, 150);
  };

  const handlePadClick = (drumPad: DrumPad) => {
    playSound(drumPad);

    if (isRecording) {
      setRecordedSequence((prev) => [
        ...prev,
        {
          sound: drumPad.soundName,
          time: Date.now(),
        },
      ]);
    }
  };

  const toggleRecording = () => {
    if (!powerOn) return;

    if (isRecording) {
      setIsRecording(false);
    } else {
      setRecordedSequence([]);
      setIsRecording(true);
    }
  };

  const playRecording = () => {
    if (!powerOn || recordedSequence.length === 0 || isPlayingRecording) return;

    setIsPlayingRecording(true);
    let delay = 0;

    recordedSequence.forEach((item, index) => {
      const drumPad = drumPads.find((pad) => pad.soundName === item.sound);

      if (drumPad) {
        setTimeout(() => {
          playSound(drumPad);
        }, delay);

        if (index < recordedSequence.length - 1) {
          delay += 500;
        }
      }
    });

    setTimeout(() => {
      setIsPlayingRecording(false);
    }, delay + 500);
  };

  const clearRecording = () => {
    setRecordedSequence([]);
  };

  const togglePower = () => {
    setPowerOn(!powerOn);
    setCurrentSound('');
    setActivePad(null);
  };

  const toggleSoundQuality = () => {
    setUseHighQuality(!useHighQuality);
    setCurrentSound(
      `Switched to ${!useHighQuality ? 'High Quality' : 'Standard'} sounds`
    );
    setTimeout(() => {
      if (!currentSound) setCurrentSound('');
    }, 1000);
  };

  return (
    <div className="drum-kit-container">
      <header className="header">
        <h1>React Drum Kit</h1>
        <p className="subtitle">
          Click the pads or press keyboard keys to play sounds
        </p>
      </header>

      <div className="drum-kit">
        <div className="control-panel">
          <div className="power-section">
            <div className="power-label">Power</div>
            <div className="power-toggle" onClick={togglePower}>
              <div className={`power-switch ${powerOn ? 'on' : 'off'}`}>
                <div className="power-knob"></div>
              </div>
              <span className="power-status">{powerOn ? 'ON' : 'OFF'}</span>
            </div>
          </div>

          <div className="display">
            <div className="display-text">
              {!powerOn ? 'Power Off' : currentSound || 'Ready to Play'}
            </div>
            <div className="display-label">Current Sound</div>
          </div>

          <div className="volume-control">
            <div className="volume-label">
              Volume: {Math.round(volume * 100)}%
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
              disabled={!powerOn}
            />
          </div>

          <div className="sound-quality">
            <div className="quality-label">Sound Quality</div>
            <button
              className={`quality-btn ${
                useHighQuality ? 'high-quality' : 'standard-quality'
              }`}
              onClick={toggleSoundQuality}
              disabled={!powerOn}
            >
              {useHighQuality ? 'High Quality 🔊' : 'Standard Quality 🥁'}
            </button>
            <div className="quality-info">
              {useHighQuality
                ? 'Using professional drum samples'
                : 'Using Mixkit drum sounds'}
            </div>
          </div>

          <div className="recording-controls">
            <div className="recording-label">Recording</div>
            <button
              className={`record-btn ${isRecording ? 'recording' : ''}`}
              onClick={toggleRecording}
              disabled={!powerOn || isPlayingRecording}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>

            {recordedSequence.length > 0 && (
              <>
                <button
                  className="play-btn"
                  onClick={playRecording}
                  disabled={
                    !powerOn ||
                    isRecording ||
                    isPlayingRecording ||
                    recordedSequence.length === 0
                  }
                >
                  {isPlayingRecording ? 'Playing...' : 'Play Recording'}
                </button>
                <button
                  className="clear-btn"
                  onClick={clearRecording}
                  disabled={!powerOn || isRecording || isPlayingRecording}
                >
                  Clear
                </button>
              </>
            )}

            <div className="recording-info">
              {recordedSequence.length > 0
                ? `${recordedSequence.length} sounds recorded`
                : 'No recording'}
            </div>
          </div>

          <div className="instructions">
            <h3>Instructions:</h3>
            <ul>
              <li>
                Click on drum pads or press corresponding keys (Q, W, E, A, S,
                D, Z, X, C)
              </li>
              <li>Adjust volume with the slider</li>
              <li>Toggle between standard and high quality sounds</li>
              <li>Record your own beats and play them back</li>
              <li>Toggle power on/off</li>
            </ul>
          </div>
        </div>

        <div className="drum-pads-grid">
          {drumPads.map((drumPad) => (
            <div
              key={drumPad.id}
              className={`drum-pad ${
                activePad === drumPad.id ? 'active' : ''
              } ${!powerOn ? 'disabled' : ''}`}
              onClick={() => handlePadClick(drumPad)}
              style={
                {
                  '--pad-color': drumPad.color,
                  '--pad-shadow': `${drumPad.color}80`,
                } as React.CSSProperties
              }
            >
              <div className="pad-label">{drumPad.label}</div>
              <div className="pad-name">{drumPad.soundName}</div>

              <audio
                ref={(el) => {
                  if (el) audioRefs.current[drumPad.id] = el;
                }}
                src={drumPad.soundFile}
                className="clip"
                preload="auto"
              />

              <div className="key-hint">Key: {drumPad.key}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>
          Built with React + TypeScript + Vite • Press keyboard keys or click
          pads to play
        </p>
        <p className="keyboard-hint">Try pressing keys: Q W E A S D Z X C</p>
        <div className="sound-source">
          {useHighQuality
            ? 'Using professional drum samples from SampleSwap'
            : 'Using Mixkit drum sounds'}
        </div>
      </footer>
    </div>
  );
};

export default DrumKit;
