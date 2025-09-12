// 音乐相关类型定义

export interface LyricsLine {
  time: number;
  text: string;
}

export interface MusicInfo {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  cover_url: string;
  music_url: string;
  duration: number;
  lyrics: string;
  playCount: number;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  genres: string[];
  releaseDate: string;
}

// 播放状态
export interface PlayState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoop: boolean;
  isShuffle: boolean;
}

// 分享信息
export interface ShareInfo {
  platform: 'wechat' | 'qq' | 'weibo' | 'douyin' | 'copy';
  title: string;
  description: string;
  image: string;
  url: string;
}

// 用户信息
export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  isVip?: boolean;
}

// 评论信息
export interface Comment {
  id: string;
  user: UserInfo;
  content: string;
  time: string;
  likeCount: number;
  replies?: Comment[];
}
