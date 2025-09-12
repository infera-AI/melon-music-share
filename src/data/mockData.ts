// 模拟音乐数据
import { MusicInfo } from '../types/music';

export const mockMusicList: MusicInfo[] = [
  {
    id: '1',
    title: '夜曲',
    artist: '周杰伦',
    album: '十一月的萧邦',
    cover: 'https://picsum.photos/300/300?random=5',
    music_url: 'https://example.com/audio5.mp3',
    cover_url: 'https://example.com/audio5.mp3',
    duration: 215,
    playCount: 4567890,
    likeCount: 345678,
    shareCount: 8901,
    commentCount: 4567,
    genres: ['流行', '华语', '古典'],
    releaseDate: '2005-01-01',
    lyrics:""
  },
];

// 获取随机音乐
export const getRandomMusic = (): MusicInfo => {
  const randomIndex = Math.floor(Math.random() * mockMusicList.length);
  return mockMusicList[randomIndex];
};

// 根据ID获取音乐
export const getMusicById = (id: string): MusicInfo | undefined => {
  return mockMusicList.find(music => music.id === id);
};
