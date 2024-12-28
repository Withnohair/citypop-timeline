import React from 'react';
import styled from 'styled-components';
import { useState, useMemo, useRef } from 'react';
import AudioPlayer from './AudioPlayer';

const PageContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px;
  gap: 30px;
`;

const Sidebar = styled.div`
  width: 280px;
  min-height: calc(100vh - 40px);
  position: sticky;
  top: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const ArtistLink = styled.a`
  display: block;
  padding: 12px 20px;
  color: #666;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  font-size: 0.95em;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: #2196f3;
    transform: scaleY(0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover {
    color: #2196f3;
    background: rgba(33, 150, 243, 0.05);
    padding-left: 25px;
  }
  
  &.active {
    color: #2196f3;
    font-weight: 500;
    background: rgba(33, 150, 243, 0.08);
    padding-left: 25px;
    
    &:before {
      transform: scaleY(1);
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  min-height: calc(100vh - 40px);
`;

// 样式组件
const TimelineContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 15px;  // 减小垂直间距，原来可能是 30px 或更多
  padding: 10px;
  border-left: 2px solid #2196f3;
  background: rgba(33, 150, 243, 0.05);
  
  &:hover {
    background: rgba(33, 150, 243, 0.1);
  }
`;

const Year = styled.div`
  min-width: 80px;
  font-weight: bold;
  color: #2196f3;
`;

const Content = styled.div`
  flex: 1;
  padding-left: 15px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 4px;  // 减小标题和内容的间距
`;

const Details = styled.div`
  font-size: 0.9em;
  color: #666;
  margin-top: 4px;
`;

const Relationships = styled.div`
  font-size: 0.85em;
  color: #888;
  margin-top: 4px;
`;

const ArtistInfoPanel = styled.div`
  margin-bottom: 25px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  gap: 20px;
`;

const ArtistImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const ArtistDetails = styled.div`
  flex: 1;
`;

const ArtistName = styled.h2`
  margin: 0 0 15px 0;
  font-size: 24px;
`;

const ArtistInfo = styled.div`
  margin-bottom: 8px;
  line-height: 1.6;
`;

// 艺术家信息数据
const artistsInfo = {
  "山下達郎": {
    nameEn: "Tatsuro Yamashita",
    birth: "1953年2月4日",
    birthPlace: "東京都",
    debut: "1972年",
    image: "/images/artists/yamashita.jpg",
    description: "シティポップを代表するミュージシャン。ハッピーエンドのメンバーとしてデビュー。代表作「クリスマス・イブ」「オン・ザ・ストリート・コーナー」など。",
    labels: ["RCA", "AIR", "MOON"],
    instruments: ["ボーカル", "ギター", "キーボード"]
  },
  "大貫妙子": {
    nameEn: "Taeko Onuki",
    birth: "1953年11月28日",
    birthPlace: "東京都",
    debut: "1973年",
    image: "/images/artists/onuki.jpg",
    description: "シュガー・ベイブのボーカリストとして活動後、ソロデビュー。独特な歌唱力と詩的な歌詞で知られる。代表作「都会」「Law of Nature」など。",
    labels: ["RCA", "INVITATION"],
    instruments: ["ボーカル", "ピアノ"]
  },
  "杏里": {
    nameEn: "Anri",
    birth: "1961年8月31日",
    birthPlace: "神奈川県",
    debut: "1978年",
    image: "/images/artists/anri.jpg",
    description: "透明感のある歌声とポップなサウンドで人気を博す。代表作「オリビアを聴きながら」「キャッツ・アイ」など。",
    labels: ["FOR LIFE"],
    instruments: ["ボーカル"]
  },
  "松原みき": {
    nameEn: "Miki Matsubara",
    birth: "1959年11月28日",
    birthPlace: "大阪府",
    debut: "1979年",
    image: "/images/artists/matsubara.jpg",
    description: "1979年「真夜中のドア」でデビュー。ジャズテイストの歌唱力と表現力で注目を集める。作詞作曲家としても活躍。",
    labels: ["Nippon Columbia"],
    instruments: ["ボーカル"]
  },
  "パイパー": {
    nameEn: "Piper",
    birth: "1981年結成",
    birthPlace: "東京都",
    debut: "1981年",
    image: "/images/artists/piper.jpg",
    description: "浅川マキ(vo)、井上鑑(key)、村山達彦(g)、佐藤武(b)によって結成されたバンド。代表作「Sunshine Kiz」「夏色のナンシー」など。",
    labels: ["Yupiteru"],
    instruments: ["ボーカル", "ギター", "ベース", "キーボード"]
  },
  "亜蘭知子": {
    nameEn: "Tomoko Aran",
    birth: "1958年2月4日",
    birthPlace: "東京都",
    debut: "1978年",
    image: "/images/artists/aran.jpg",
    description: "独特な声質とメロディーラインで知られる。代表作「Midnight Pretenders」「I'm In Love」など。",
    labels: ["AARD-VARK", "Victor"],
    instruments: ["ボーカル", "ピアノ"]
  },
  "SUGAR BABE": {
    nameEn: "Sugar Babe",
    birth: "1973年結成",
    birthPlace: "東京都",
    debut: "1975年",
    image: "/images/artists/sugarbabe.jpg",
    description: "大貫妙子、山下達郎らによって結成されたバンド。「DOWN TOWN」などの名曲を残す。解散後メンバーはソロで活躍。",
    labels: ["NIAGARA"],
    instruments: ["ボーカル", "ギター", "ベース", "ドラムス"]
  },
  "ブレッド&バター": {
    nameEn: "Bread & Butter",
    birth: "1972年結成",
    birthPlace: "東京都",
    debut: "1972年",
    image: "/images/artists/breadandbutter.jpg",
    description: "小林武史を中心に結成されたバンド。「SUMMER BLUE」など夏を感じさせる楽曲で知られる。",
    labels: ["ELEKTRA"],
    instruments: ["ボーカル", "ギター", "ベース", "ドラムス"]
  },
  "具島直子": {
    nameEn: "Naoko Gushima",
    birth: "1960年",
    birthPlace: "東京都",
    debut: "1981年",
    image: "/images/artists/gushima.jpg",
    description: "透明感のある歌声とメロディアスな楽曲で人気を博す。代表作「Dream for 2」「シルエット・ロマンス」など。",
    labels: ["EPIC"],
    instruments: ["ボーカル"]
  },
  "吉田美奈子": {
    nameEn: "Minako Yoshida",
    birth: "1953年6月19日",
    birthPlace: "東京都",
    debut: "1972年",
    image: "/images/artists/yoshida.jpg",
    description: "ジャズ的なアプローチで知られる女性シンガー。細野晴臣、松任谷正隆らと多くの共演。代表作「LIGHT'N UP」「都会の天使たち」など。",
    labels: ["Victor"],
    instruments: ["ボーカル"]
  },
  "大野雄二": {
    nameEn: "Yuji Ohno",
    birth: "1941年5月30日",
    birthPlace: "岐阜県",
    debut: "1960年代",
    image: "/images/artists/ohno.jpg",
    description: "ジャズピアニスト、作曲家。「ルパン三世」シリーズの音楽で知られる。シティポップにも大きな影響を与える。",
    labels: ["VAP", "Victor"],
    instruments: ["ピアノ", "シンセサイザー"]
  },
  "岩崎宏美": {
    nameEn: "Hiromi Iwasaki",
    birth: "1958年11月12日",
    birthPlace: "東京都",
    debut: "1975年",
    image: "/images/artists/iwasaki.jpg",
    description: "パワフルな歌唱力で知られる。「タウ���へ行こうよ」「聖母たちのララバイ」など多くのヒット曲を持つ。",
    labels: ["Victor"],
    instruments: ["ボーカル"]
  },
  "黒住憲五": {
    nameEn: "Kengo Kurozumi",
    birth: "1945年10月24日",
    birthPlace: "東京都",
    debut: "1969年",
    image: "/images/artists/kurozumi.jpg",
    description: "ジャズ・フュージョンのギタリスト。カシオペアのメンバーとしても活動。代表作「Juggler」など。",
    labels: ["Alfa"],
    instruments: ["ギター"]
  },
  "Friday Night Plans": {
    nameEn: "Friday Night Plans",
    birth: "2019年結成",
    birthPlace: "東京都",
    debut: "2019年",
    image: "/images/artists/fnp.jpg",
    description: "SALUとマルコによるユニット。竹内まりやの「プラスティック・ラブ」のカバーで注目を集める。",
    labels: ["UNIVERSAL MUSIC"],
    instruments: ["ボーカル", "シンセサイザー"]
  }
};

// 音乐数据
const musicData = {
  "山下達郎": {
    songs: [
      {
        title: "Fragile",
        file: "/music/山下達郎 - Fragile.mp3"
      },
      {
        title: "RAINY WALK",
        file: "/music/山下達郎 - RAINY WALK.mp3"
      },
      {
        title: "いつか（SOMEDAY）",
        file: "/music/山下達郎 - いつか（SOMEDAY）.mp3"
      },
      {
        title: "ピンク・シャドウ",
        file: "/music/山下達郎 - ピンク・シャドウ.mp3"
      }
    ]
  },
  "大貫妙子": {
    songs: [
      {
        title: "横顔",
        file: "/music/大貫妙子 - 横顔.mp3"
      },
      {
        title: "都会",
        file: "/music/大貫妙子 - 都会.mp3"
      }
    ]
  },
  "杏里": {
    songs: [
      {
        title: "Fly By Day",
        file: "/music/杏里 - Fly By Day.mp3"
      },
      {
        title: "Last Summer Whisper",
        file: "/music/杏里 - Last Summer Whisper.mp3"
      },
      {
        title: "MORNING HIGHWAY",
        file: "/music/杏里 - MORNING HIGHWAY.mp3"
      },
      {
        title: "Remember Summer Days",
        file: "/music/杏里 - Remember Summer Days.mp3"
      }
    ]
  },
  "松原みき": {
    songs: [{
      title: "真夜中のドア Stay With Me",
      file: "/music/松原みき - 真夜中のドアStay With Me (シングルver.).mp3"
    }]
  },
  "パイパー": {
    songs: [{
      title: "Sunshine Kiz",
      file: "/music/パイパー - Sunshine Kiz.mp3"
    }]
  },
  "亜蘭知子": {
    songs: [{
      title: "Midnight Pretenders",
      file: "/music/亜蘭知子 - Midnight Pretenders (2022 restored version).mp3"
    }]
  },
  "SUGAR BABE": {
    songs: [{
      title: "DOWN TOWN",
      file: "/music/SUGAR BABE - DOWN TOWN.mp3"
    }]
  },
  "ブレッド&バター": {
    songs: [{
      title: "SUMMER BLUE",
      file: "/music/ブレッド&バター - SUMMER BLUE.mp3"
    }]
  },
  "具島直子": {
    songs: [{
      title: "Dream for 2",
      file: "/music/具島直子 - Dream for 2.mp3"
    }]
  },
  "吉田美奈子": {
    songs: [{
      title: "恋は流星",
      file: "/music/吉田美奈子 - 恋は流星.mp3"
    }]
  },
  "大野雄二": {
    songs: [{
      title: "ラブ・スコール",
      file: "/music/大野雄二,Fujikochans - ラブ・スコール.mp3"
    }]
  },
  "岩崎宏美": {
    songs: [{
      title: "Street Dancer",
      file: "/music/岩崎宏美 - Street Dancer.mp3"
    }]
  },
  "黒住憲五": {
    songs: [{
      title: "Juggler",
      file: "/music/黒住憲五 - Juggler.mp3"
    }]
  },
  "Friday Night Plans": {
    songs: [{
      title: "Plastic Love",
      file: "/music/Friday Night Plans - Plastic Love.mp3"
    }]
  }
};

function Timeline({ onSongChange, currentSong, isPlaying }) {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const audioRef = useRef(null);
  
  const timelineData = [
    {
      year: 1975,
      artist: "SUGAR BABE",
      song: "DOWN TOWN",
      album: "SONGS",
      label: "NIAGARA",
      relationships: ["大貫妙子 (ボーカル)", "山下達郎 (ギター)", "細野晴臣 (プロデュース)"]
    },
    {
      year: 1976,
      artist: "吉田美奈子",
      song: "恋は流星",
      album: "FLAPPER",
      label: "Victor",
      relationships: ["松任谷正隆 (アレンジ)", "細野晴臣 (ベース)"]
    },
    {
      year: 1977,
      artist: "ブレッド&バター",
      song: "SUMMER BLUE",
      album: "LATE LATE SUMMER",
      label: "ELEKTRA",
      relationships: ["小林武史 (ギター)", "山本恭司 (アレンジ)"]
    },
    {
      year: 1978,
      artist: "大貫妙子",
      song: "都会",
      album: "SUNSHOWER",
      label: "RCA",
      relationships: ["細野晴臣 (プロデュース)", "鈴木茂 (ギター)"]
    },
    {
      year: 1978,
      artist: "岩崎宏美",
      song: "Street Dancer",
      album: "SIMPLE THINGS",
      label: "Victor",
      relationships: ["松本隆 (作詞)", "大滝詠一 (編曲)"]
    },
    {
      year: 1979,
      artist: "大野雄二",
      song: "ラブ・スコール",
      album: "LUPIN THE THIRD",
      label: "VAP",
      relationships: ["大野雄二 (作曲)", "Fujikochans (コーラス)"]
    },
    {
      year: 1979,
      artist: "松原みき",
      song: "真夜中のドア Stay With Me",
      album: "POCKET PARK",
      label: "Nippon Columbia",
      relationships: ["松原みき (作詞)", "北川祐 (編曲)"]
    },
    {
      year: 1981,
      artist: "パイパー",
      song: "Sunshine Kiz",
      album: "PIPER",
      label: "Yupiteru",
      relationships: ["浅川マキ (ボーカル)", "井上鑑 (キーボード)"]
    },
    {
      year: 1981,
      artist: "具島直子",
      song: "Dream for 2",
      album: "NAOKO",
      label: "EPIC",
      relationships: ["松本隆 (作詞)", "林哲司 (作曲)"]
    },
    {
      year: 1981,
      artist: "黒住憲五",
      song: "Juggler",
      album: "JUGGLER",
      label: "Alfa",
      relationships: ["黒住憲五 (作曲)", "向谷実 (キーボード)"]
    },
    {
      year: 1982,
      artist: "亜蘭知子",
      song: "Midnight Pretenders",
      album: "JAPANESE GIRL",
      label: "AARD-VARK",
      relationships: ["大村雅朗 (アレンジ)", "松任谷正隆 (ギター)"]
    },
    {
      year: 1982,
      artist: "山下達郎",
      song: "RAINY WALK",
      album: "FOR YOU",
      label: "AIR",
      relationships: ["山下達郎 (作詞作曲編曲)", "林立夫 (ドラム)"]
    },
    {
      year: 1983,
      artist: "大貫妙子",
      song: "横顔",
      album: "AVENTURE",
      label: "RCA",
      relationships: ["坂本龍一 (キーボード)", "大貫妙子 (作詞作曲)"]
    },
    {
      year: 1983,
      artist: "杏里",
      song: "Fly By Day",
      album: "TIMELY!!",
      label: "FOR LIFE",
      relationships: ["松本隆 (作詞)", "杏里 (作曲)"]
    },
    {
      year: 1983,
      artist: "杏里",
      song: "Last Summer Whisper",
      album: "TIMELY!!",
      label: "FOR LIFE",
      relationships: ["松本隆 (作詞)", "杏里 (作曲)"]
    },
    {
      year: 1983,
      artist: "杏里",
      song: "MORNING HIGHWAY",
      album: "TIMELY!!",
      label: "FOR LIFE",
      relationships: ["松本隆 (作詞)", "杏里 (作曲)"]
    },
    {
      year: 1983,
      artist: "杏里",
      song: "Remember Summer Days",
      album: "TIMELY!!",
      label: "FOR LIFE",
      relationships: ["松本隆 (作詞)", "杏里 (作曲)"]
    },
    {
      year: 1984,
      artist: "山下達郎",
      song: "いつか（SOMEDAY）",
      album: "PACIFIC",
      label: "AIR",
      relationships: ["山下達郎 (作詞作曲編曲)"]
    },
    {
      year: 1984,
      artist: "山下達郎",
      song: "ピンク・シャドウ",
      album: "PACIFIC",
      label: "AIR",
      relationships: ["山下達郎 (作詞作曲編曲)"]
    },
    {
      year: 1984,
      artist: "山下達郎",
      song: "Fragile",
      album: "PACIFIC",
      label: "AIR",
      relationships: ["山下達郎 (作詞作曲編曲)"]
    },
    {
      year: 2019,
      artist: "Friday Night Plans",
      song: "Plastic Love",
      album: "MIDNIGHT PHOENIX",
      label: "UNIVERSAL MUSIC",
      relationships: ["竹内まりや (原曲)", "SALU (アレンジ)"]
    }
  ];

  // 生成艺术家列表
  const artists = useMemo(() => {
    const uniqueArtists = [...new Set(timelineData.map(item => item.artist))];
    return uniqueArtists.sort();
  }, []);
  
  // 过滤显示的数据
  const filteredData = useMemo(() => {
    if (!selectedArtist) return timelineData;
    return timelineData.filter(item => item.artist === selectedArtist);
  }, [selectedArtist]);

  const handlePlay = (song) => {
    if (audioRef.current) {
      const songInfo = {
        file: song.file,
        title: song.title,
        artist: selectedArtist
      };
      onSongChange(songInfo, !isPlaying);
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        <ArtistLink 
          onClick={() => setSelectedArtist(null)}
          className={!selectedArtist ? 'active' : ''}
        >
          全部作品
        </ArtistLink>
        {artists.map(artist => (
          <ArtistLink
            key={artist}
            onClick={() => setSelectedArtist(artist)}
            className={selectedArtist === artist ? 'active' : ''}
          >
            {artist}
            <span style={{color: '#999', fontSize: '0.8em'}}>
              {` (${timelineData.filter(item => item.artist === artist).length})`}
            </span>
          </ArtistLink>
        ))}
      </Sidebar>
      
      <MainContent>
        {selectedArtist && artistsInfo[selectedArtist] && (
          <ArtistInfoPanel>
            <ArtistImage 
              src={artistsInfo[selectedArtist].image} 
              alt={selectedArtist}
            />
            <ArtistDetails>
              <ArtistName>
                {selectedArtist}
                <span style={{fontSize: '0.6em', color: '#666', marginLeft: '10px'}}>
                  {artistsInfo[selectedArtist].nameEn}
                </span>
              </ArtistName>
              <ArtistInfo>
                出生日期：{artistsInfo[selectedArtist].birth}<br/>
                出身地：{artistsInfo[selectedArtist].birthPlace}<br/>
                出道日：{artistsInfo[selectedArtist].debut}<br/>
                使用乐器：{artistsInfo[selectedArtist].instruments.join('、')}<br/>
                标签：{artistsInfo[selectedArtist].labels.join('、')}
              </ArtistInfo>
              <ArtistInfo>
                {artistsInfo[selectedArtist].description}
              </ArtistInfo>
              
              {/* 修改后的音乐播放器 */}
              {musicData[selectedArtist] && (
                <AudioPlayer 
                  songs={musicData[selectedArtist].songs} 
                  onSongChange={onSongChange}
                  currentGlobalSong={currentSong}
                  isGlobalPlaying={isPlaying}
                  artist={selectedArtist}
                />
              )}
            </ArtistDetails>
          </ArtistInfoPanel>
        )}
        
        {filteredData.map((item, index) => (
          <TimelineItem key={index}>
            <Year>{item.year}</Year>
            <Content>
              <Title>{item.artist} - {item.song}</Title>
              <Details>
                {item.album} ({item.label})
              </Details>
              <Relationships>
                {item.relationships.join(' • ')}
              </Relationships>
            </Content>
          </TimelineItem>
        ))}
      </MainContent>
    </PageContainer>
  );
}

export default Timeline; 