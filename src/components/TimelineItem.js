import React from 'react';
import styled from 'styled-components';
import AudioPlayer from './AudioPlayer';

const ItemContainer = styled.div`
  display: flex;
  margin: 20px 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

const YearSection = styled.div`
  min-width: 80px;
  font-size: 1.2em;
  color: #4ecdc4;
`;

const ContentSection = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #fff;
`;

const Details = styled.div`
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
`;

const Relationships = styled.div`
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.6);
`;

const AudioSection = styled.div`
  margin-top: 15px;
  width: 100%;
`;

const TimelineItem = ({ data, artistInfo, music }) => {
  return (
    <ItemContainer>
      <YearSection>{data.year}</YearSection>
      <ContentSection>
        <Title>
          {data.artist} - {data.song}
        </Title>
        <Details>
          Album: {data.album} ({data.label})
        </Details>
        <Relationships>
          {data.relationships.join(' / ')}
        </Relationships>
        {music && (
          <AudioSection>
            <AudioPlayer audioFile={music.file} />
          </AudioSection>
        )}
      </ContentSection>
    </ItemContainer>
  );
};

export default TimelineItem; 