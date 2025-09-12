// 音乐API服务 - 模拟后端接口
import { MusicInfo } from '../types/music';
import { mockMusicList } from '../data/mockData';
import { api } from './httpClient';
import { API_CONFIG } from '../config/apiConfig';

// 获取音乐共享信息请求参数
export interface GetMusicByShareKeyRequest {
  share_key?: string;
  [property: string]: any;
}

// 获取音乐共享信息响应
export interface GetMusicByShareKeyResponse {
  success: boolean;
  data?: MusicInfo;
  message?: string;
  code?: number;
}

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MusicApiService {
  // 获取音乐列表
  static async getMusicList(): Promise<MusicInfo[]> {
    await delay(500); // 模拟网络延迟
    return mockMusicList;
  }

  // 根据ID获取音乐
  static async getMusicById(id: string): Promise<MusicInfo | null> {
    await delay(300);
    const music = mockMusicList.find(m => m.id === id);
    return music || null;
  }

  // 搜索音乐
  static async searchMusic(keyword: string): Promise<MusicInfo[]> {
    await delay(400);
    const results = mockMusicList.filter(music => 
      music.title.toLowerCase().includes(keyword.toLowerCase()) ||
      music.artist.toLowerCase().includes(keyword.toLowerCase()) ||
      music.album.toLowerCase().includes(keyword.toLowerCase())
    );
    return results;
  }

  // 获取推荐音乐
  static async getRecommendedMusic(): Promise<MusicInfo[]> {
    await delay(600);
    // 随机返回3首音乐作为推荐
    const shuffled = [...mockMusicList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  // 喜欢音乐
  static async likeMusic(musicId: string): Promise<boolean> {
    await delay(200);
    console.log(`喜欢音乐: ${musicId}`);
    return true;
  }

  // 取消喜欢音乐
  static async unlikeMusic(musicId: string): Promise<boolean> {
    await delay(200);
    console.log(`取消喜欢音乐: ${musicId}`);
    return true;
  }

  // 分享音乐
  static async shareMusic(musicId: string, platform: string): Promise<boolean> {
    await delay(300);
    console.log(`分享音乐 ${musicId} 到 ${platform}`);
    return true;
  }

  // 获取音乐播放统计
  static async getMusicStats(musicId: string): Promise<{
    playCount: number;
    likeCount: number;
    shareCount: number;
  }> {
    await delay(200);
    const music = mockMusicList.find(m => m.id === musicId);
    return {
      playCount: music?.playCount || 0,
      likeCount: music?.likeCount || 0,
      shareCount: music?.shareCount || 0,
    };
  }

  // 更新播放次数
  static async updatePlayCount(musicId: string): Promise<boolean> {
    await delay(100);
    console.log(`更新播放次数: ${musicId}`);
    return true;
  }

  // 根据分享密钥获取音乐信息 (模拟版本)
  static async getMusicByShareKey(request: GetMusicByShareKeyRequest): Promise<GetMusicByShareKeyResponse> {
    await delay(500); // 模拟网络延迟
    
    try {
      const { share_key } = request;
      
      if (!share_key) {
        return {
          success: false,
          message: '分享密钥不能为空',
          code: 400
        };
      }

      // 模拟根据分享密钥查找音乐
      // 这里可以根据实际的分享密钥逻辑来查找对应的音乐
      const music = mockMusicList.find(m => m.id === share_key) || mockMusicList[0];
      
      if (!music) {
        return {
          success: false,
          message: '未找到对应的音乐信息',
          code: 404
        };
      }

      return {
        success: true,
        data: music,
        message: '获取成功',
        code: 200
      };
    } catch (error) {
      console.error('获取音乐共享信息失败:', error);
      return {
        success: false,
        message: '服务器内部错误',
        code: 500
      };
    }
  }

  // 根据分享密钥获取音乐信息 (真实API调用)
  static async getMusicByShareKeyFromAPI(request: GetMusicByShareKeyRequest): Promise<GetMusicByShareKeyResponse> {
    try {
      const { share_key } = request;
      
      if (!share_key) {
        return {
          success: false,
          message: '分享密钥不能为空',
          code: 400
        };
      }

      // 使用 GET 方法调用 API
      const response = await api.get(API_CONFIG.ENDPOINTS.GET_MUSIC_BY_SHARE_KEY, {
        params: { share_key }
      });
      console.log(response);
      if (response.data && response.data.code === 200) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || '获取成功',
          code: response.status
        };
      } else {
        return {
          success: false,
          message: response.data?.message || '获取失败',
          code: response.status
        };
      }
    } catch (error: any) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data?.message || '服务器错误',
          code: error.response.status
        };
      } else if (error.request) {
        return {
          success: false,
          message: '网络连接失败',
          code: 0
        };
      } else {
        return {
          success: false,
          message: '请求配置错误',
          code: -1
        };
      }
    }
  }

}

// 导出默认实例
export default MusicApiService;
