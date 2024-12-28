import React, { useState, useRef } from 'react';
import Timeline from './components/Timeline';
import FloatingPlayer from './components/FloatingPlayer';

const App = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const handleSongChange = (song, shouldPlay) => {
    setCurrentSong(song);
    setIsPlaying(shouldPlay);
    if (audioRef.current) {
      audioRef.current.src = song.file;
      if (shouldPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audioRef.current) {
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  return (
    <div>
      <Timeline 
        onSongChange={handleSongChange}
        currentSong={currentSong}
        isPlaying={isPlaying}
      />
      {currentSong && (
        <FloatingPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          onPlayPause={handlePlayPause}
          onProgressClick={handleProgressClick}
        />
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default App; 