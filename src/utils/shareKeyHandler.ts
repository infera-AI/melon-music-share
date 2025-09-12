// 分享密钥处理工具
import { MusicApiService, GetMusicByShareKeyRequest, GetMusicByShareKeyResponse } from '../services/musicApi';
import { MusicInfo } from '../types/music';

/**
 * 从URL参数中获取分享密钥
 */
export const getShareKeyFromUrl = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('share_key') || urlParams.get('key') || null;
};

/**
 * 根据分享密钥获取音乐信息
 */
export const fetchMusicByShareKey = async (shareKey: string): Promise<{
  success: boolean;
  music?: MusicInfo;
  error?: string;
}> => {
  try {
    const request: GetMusicByShareKeyRequest = {
      share_key: shareKey
    };

    // 使用模拟版本 (开发环境)
    // 在生产环境中可以切换到 getMusicByShareKeyFromAPI
    const response: GetMusicByShareKeyResponse = await MusicApiService.getMusicByShareKeyFromAPI(request);
    
    if (response.success && response.data) {
      return {
        success: true,
        music: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || '获取音乐信息失败'
      };
    }
  } catch (error) {
    console.error('获取音乐信息时发生错误:', error);
    return {
      success: false,
      error: '网络错误，请稍后重试'
    };
  }
};

/**
 * 生成分享链接
 */
export const generateShareUrl = (shareKey: string, baseUrl?: string): string => {
  const base = baseUrl || window.location.origin + window.location.pathname;
  return `${base}?share_key=${encodeURIComponent(shareKey)}`;
};

/**
 * 复制分享链接到剪贴板
 */
export const copyShareUrlToClipboard = async (shareKey: string): Promise<boolean> => {
  try {
    const shareUrl = generateShareUrl(shareKey);
    
    if (navigator.clipboard && window.isSecureContext) {
      // 使用现代 Clipboard API
      await navigator.clipboard.writeText(shareUrl);
    } else {
      // 降级方案：使用传统的 document.execCommand
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (!successful) {
        throw new Error('复制失败');
      }
    }
    
    return true;
  } catch (error) {
    console.error('复制分享链接失败:', error);
    return false;
  }
};

/**
 * 检查是否为分享链接
 */
export const isShareUrl = (): boolean => {
  return getShareKeyFromUrl() !== null;
};
