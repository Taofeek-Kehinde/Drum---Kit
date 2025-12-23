# 🥁 React Drum Kit

An interactive, feature-rich drum kit web application built with React, TypeScript, and Vite. Create beats, record sequences, and enjoy a realistic drumming experience right in your browser!

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)

## ✨ Features

### 🎵 Interactive Drum Pads

- **9 Professional Drum Sounds**: Kick, Snare, Hi-Hats, Toms, Crash, and Ride cymbals
- **Dual Input Methods**: Click pads with your mouse or use keyboard shortcuts
- **Visual Feedback**: Animated pads that light up when triggered
- **Custom Color Coding**: Each drum pad has its unique color scheme

### 🔊 Sound Quality Options

- **Standard Quality**: Fast-loading Mixkit drum sounds perfect for quick sessions
- **High Quality**: Professional-grade drum samples from SampleSwap for studio-quality sound
- **Toggle Anytime**: Switch between sound sets on the fly

### 🎙️ Recording & Playback

- **Record Sequences**: Capture your drum beats in real-time
- **Playback Feature**: Listen to your recorded sequences
- **Sequence Counter**: Track how many sounds you've recorded
- **Clear Function**: Start fresh anytime

### 🎛️ Advanced Controls

- **Volume Control**: Adjustable volume slider (0-100%)
- **Power Toggle**: Turn the drum kit on/off
- **Real-time Display**: Shows the currently playing sound
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🎹 Keyboard Controls

| Key   | Drum Sound           |
| ----- | -------------------- |
| **Q** | Kick Drum            |
| **W** | Snare Drum           |
| **E** | Closed Hi-Hat / Clap |
| **A** | Open Hi-Hat          |
| **S** | High Tom             |
| **D** | Mid Tom              |
| **Z** | Floor Tom / Low Tom  |
| **X** | Crash Cymbal         |
| **C** | Ride Cymbal          |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Taofeek-Kehinde/Drum---Kit.git
   cd Drum---Kit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎮 How to Use

1. **Power On**: Make sure the power toggle is set to "ON"
2. **Choose Sound Quality**: Toggle between Standard and High Quality sounds
3. **Play Drums**:
   - Click on any drum pad with your mouse
   - Or press the corresponding keyboard key (Q, W, E, A, S, D, Z, X, C)
4. **Adjust Volume**: Use the volume slider to set your preferred level
5. **Record a Beat**:
   - Click "Start Recording"
   - Play your drum sequence
   - Click "Stop Recording"
   - Hit "Play Recording" to hear it back
6. **Clear Recording**: Click "Clear" to remove the recorded sequence

## 🛠️ Technologies Used

- **React 19.2.0**: Modern UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Lightning-fast build tool and dev server
- **CSS3**: Custom styling with animations and transitions
- **Web Audio API**: For audio playback via HTML5 `<audio>` elements

## 📁 Project Structure

```
drum-kenny/
├── src/
│   ├── assets/
│   │   ├── sound/
│   │   │   ├── kick.wav
│   │   │   ├── snare.wav
│   │   │   ├── hihat-closed.mp3
│   │   │   ├── hihat-open.mp3
│   │   │   ├── tom-high.mp3
│   │   │   ├── tom-mid.mp3
│   │   │   ├── tom-low.mp3
│   │   │   ├── crash.mp3
│   │   │   └── ride.mp3
│   │   └── favicon.png
│   ├── components/
│   │   └── DrumKit.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── DrumKit.css
│   ├── index.css
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Key Components

### DrumKit Component

The main component featuring:

- State management for active pads, recording, volume, and power
- Keyboard event listeners for key presses
- Audio playback logic with volume control
- Recording and playback functionality
- Responsive grid layout for drum pads

## 🌟 Features in Detail

### Visual Design

- Modern, sleek interface with gradient backgrounds
- Color-coded drum pads for easy identification
- Smooth animations and hover effects
- Professional control panel design

<!-- ## 📝 Scripts

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Start development server    |
| `npm run build`   | Build for production        |
| `npm run preview` | Preview production build    |
| `npm run lint`    | Run ESLint for code quality |

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Taofeek Kehinde**

- GitHub: [@Taofeek-Kehinde](https://github.com/Taofeek-Kehinde)

## Contributor

**Olanrewaju Williams**

- GitHub: [@lanre647](https://github.com/lanre647)

## 🐛 Known Issues

If you encounter audio playback issues:

1. Ensure your browser allows audio autoplay
2. Try clicking on the page first to enable audio context
3. Check your browser's audio permissions

---

**Enjoy making beats!** 🎵🥁

If you like this project, please give it a ⭐ on GitHub!
