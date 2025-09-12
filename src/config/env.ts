// 环境变量配置
export const ENV = {
  // API 配置
  API_BASE_URL: (import.meta as any).env?.VITE_API_BASE_URL || 'http://218.244.147.232:80/api',
  API_TIMEOUT: Number((import.meta as any).env?.VITE_API_TIMEOUT) || 10000,
  
  // 应用配置
  APP_TITLE: (import.meta as any).env?.VITE_APP_TITLE || 'Melon Music Share',
  APP_VERSION: (import.meta as any).env?.VITE_APP_VERSION || '1.0.0',
  
  // 调试模式
  DEBUG: (import.meta as any).env?.VITE_DEBUG === 'true' || (import.meta as any).env?.DEV,
  
  // 其他配置
  ENABLE_MOCK_API: (import.meta as any).env?.VITE_ENABLE_MOCK_API === 'true',
  
  // 是否为开发环境
  IS_DEV: (import.meta as any).env?.DEV,
  
  // 是否为生产环境
  IS_PROD: (import.meta as any).env?.PROD,
};

// 导出环境信息
export const getEnvInfo = () => {
  return {
    mode: (import.meta as any).env?.MODE || 'development',
    dev: ENV.IS_DEV,
    prod: ENV.IS_PROD,
    apiBaseUrl: ENV.API_BASE_URL,
    debug: ENV.DEBUG,
  };
};
