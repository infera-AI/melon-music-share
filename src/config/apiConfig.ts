// API 服务器配置
import { ENV } from './env';

export const API_CONFIG = {
  // 基础 API 地址
  BASE_URL: ENV.API_BASE_URL,
  
  // 超时时间 (毫秒)
  TIMEOUT: ENV.API_TIMEOUT,
  
  // 请求头配置
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // API 端点
  ENDPOINTS: {
    // 获取音乐共享信息
    GET_MUSIC_BY_SHARE_KEY: '/opensource/get_music_by_share_key_os',
    
    // 其他可能的端点
    GET_MUSIC_LIST: '/music/list',
    GET_MUSIC_DETAIL: '/music/detail',
    SEARCH_MUSIC: '/music/search',
    LIKE_MUSIC: '/music/like',
    SHARE_MUSIC: '/music/share',
  }
};

// 环境配置
export const ENV_CONFIG = {
  // 开发环境
  DEVELOPMENT: {
    BASE_URL: ENV.API_BASE_URL,
    DEBUG: ENV.DEBUG,
  },
  
  // 生产环境
  PRODUCTION: {
    BASE_URL: ENV.API_BASE_URL,
    DEBUG: false,
  }
};

// 获取当前环境配置
export const getCurrentConfig = () => {
  return ENV.IS_DEV ? ENV_CONFIG.DEVELOPMENT : ENV_CONFIG.PRODUCTION;
};

// 获取完整的 API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
