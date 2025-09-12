// HTTP 客户端配置
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, getCurrentConfig } from '../config/apiConfig';

// 创建 axios 实例
const createHttpClient = (): AxiosInstance => {
  const config = getCurrentConfig();
  
  const instance = axios.create({
    baseURL: config.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 可以在这里添加认证 token
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

// 导出配置好的 axios 实例
export const httpClient = createHttpClient();

// 导出一些常用的请求方法
export const api = {
  // GET 请求
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return httpClient.get(url, config);
  },

  // POST 请求
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return httpClient.post(url, data, config);
  },

  // PUT 请求
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return httpClient.put(url, data, config);
  },

  // DELETE 请求
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return httpClient.delete(url, config);
  },

  // PATCH 请求
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return httpClient.patch(url, data, config);
  },
};

export default httpClient;
