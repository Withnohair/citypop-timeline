import React from 'react';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  margin-top: 15px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(33, 150, 243, 0.05);
  }
  
  ${props => props.isPlaying && `
    background: rgba(33, 150, 243, 0.1);
    
    &:hover {
      background: rgba(33, 150, 243, 0.15);
    }
  `}
`;

const PlayButton = styled.button`
  background: transparent;
  color: ${props => props.isPlaying ? '#ff6b6b' : '#2196f3'};
  border: 2px solid currentColor;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin-right: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;
  
  &:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SongInfo = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: ${props => props.isPlaying ? '600' : '500'};
  color: ${props => props.isPlaying ? '#ff6b6b' : '#333'};
  font-size: 1.1em;
  margin-bottom: 4px;
  transition: all 0.3s ease;
`;

const Duration = styled.div`
  font-size: 0.9em;
  color: #666;
  margin-left: 15px;
  opacity: 0.8;
`;

const AudioPlayer = ({ songs, onSongChange, currentGlobalSong, isGlobalPlaying, artist }) => {
  const handlePlay = (song) => {
    const songInfo = {
      file: song.file,
      title: song.title,
      artist: artist
    };
    onSongChange(songInfo, currentGlobalSong?.file !== song.file || !isGlobalPlaying);
  };

  return (
    <PlaylistContainer>
      {songs.map((song, index) => {
        const isCurrentSong = currentGlobalSong?.file === song.file;
        
        return (
          <PlaylistItem 
            key={index}
            isPlaying={isCurrentSong && isGlobalPlaying}
            onClick={() => handlePlay(song)}
          >
            <PlayButton 
              isPlaying={isCurrentSong && isGlobalPlaying}
            >
              {isCurrentSong && isGlobalPlaying ? (
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
              <Title isPlaying={isCurrentSong && isGlobalPlaying}>
                {song.title}
              </Title>
            </SongInfo>
            
            <Duration>
              {/* 如果有歌曲时长信息可以在这里显示 */}
            </Duration>
          </PlaylistItem>
        );
      })}
    </PlaylistContainer>
  );
};

export default AudioPlayer; 