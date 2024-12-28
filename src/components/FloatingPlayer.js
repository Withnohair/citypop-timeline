import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(33, 150, 243, 0.95);
  backdrop-filter: blur(10px);
  padding: 15px 20px 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 1000;
  transition: all 0.3s ease;
  min-width: 320px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  }
`;

const Visualizer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 20px;
  z-index: 1000;
`;

const Bar = styled.div`
  width: 2px;
  height: ${props => props.height}%;
  background: rgba(33, 150, 243, ${props => props.isPlaying ? '0.4' : '0.2'});
  border-radius: 1px;
  transition: height 0.3s ease;
`;

const PlayButton = styled.button`
  background: white;
  color: #2196f3;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background: #f8f8f8;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const SongInfo = styled.div`
  color: white;
  flex: 1;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.1em;
  margin-bottom: 4px;
`;

const Artist = styled.div`
  font-size: 0.9em;
  opacity: 0.9;
`;

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
`;

const Progress = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  width: ${props => props.progress}%;
  transition: width 0.1s linear;
  border-radius: 2px;
  
  &:hover {
    background: #fff;
  }
`;

const ProgressHandle = styled.div`
  position: absolute;
  right: -6px;
  top: 50%;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  transform: translate(0, -50%) scale(0);
  opacity: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  ${ProgressContainer}:hover & {
    transform: translate(0, -50%) scale(1);
    opacity: 1;
  }
  
  &:hover {
    transform: translate(0, -50%) scale(1.2);
  }
  
  &:active {
    transform: translate(0, -50%) scale(1.1);
  }
`;

const ProgressBar = styled.div`
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  width: 100%;
  overflow: visible;
  position: relative;
  
  &:hover {
    ${Progress} {
      height: 6px;
    }
  }
`;

const FloatingPlayer = ({ 
  currentSong, 
  isPlaying, 
  progress, 
  onPlayPause, 
  onProgressClick 
}) => {
  const [visualizerHeights, setVisualizerHeights] = useState(Array(5).fill(30));

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setVisualizerHeights([
          40 + Math.random() * 30,
          50 + Math.random() * 30,
          60 + Math.random() * 30,
          50 + Math.random() * 30,
          40 + Math.random() * 30,
        ]);
      }, 300);
      return () => clearInterval(interval);
    } else {
      setVisualizerHeights([30, 40, 50, 40, 30]);
    }
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <>
      <Visualizer>
        {visualizerHeights.map((height, i) => (
          <Bar 
            key={i} 
            height={height}
            isPlaying={isPlaying}
          />
        ))}
      </Visualizer>
      
      <FloatingContainer>
        <PlayButton onClick={onPlayPause}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M8 5v14l11-7z"/>
            </svg>
          )}
        </PlayButton>
        <SongInfo>
          <Title>{currentSong.title}</Title>
          <Artist>{currentSong.artist}</Artist>
        </SongInfo>
        <ProgressContainer onClick={onProgressClick}>
          <ProgressBar>
            <Progress progress={progress}>
              <ProgressHandle />
            </Progress>
          </ProgressBar>
        </ProgressContainer>
      </FloatingContainer>
    </>
  );
};

export default FloatingPlayer; 