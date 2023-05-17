import { hash } from 'ohash';
import { showInfo, showSuccess, showError } from '@/utilities/message';
import { ILoginUserInfo, IRequestHeaders } from '~/interface/user';

// export interface ResOptions<T> {
//   data: T;
//   code?: number;
//   message?: string;
// }

/**
 * api请求封装
 * @param { String } url 请求地址
 * @param { Object } options useFtech第二个参数
 * @param { Object } headers 自定义header头, 单独设置headers区分请求参数，也好设置类型
 */
const fetch = async (url: string, options?: any, headers?: any) => {
  try {
    const {
      public: { apiBase },
    } = useRuntimeConfig(); // 3.0正式版环境变量要从useRuntimeConfig里的public拿
    const reqUrl = apiBase + url; // 你的接口地址

    // 设置key
    // const key = hash(options + url);

    // 可以设置默认headers例如
    // const customHeaders = { token: useCookie('token').value, ...headers };

    const { data, pending, error, refresh } = await useFetch(reqUrl, {
      ...options,
      onRequest({ request, options }) {
        const token = useCookie('token');
        if (token.value) {
          options.headers = {
            ...(headers as IRequestHeaders),
            Authorization: `Bearer ${token.value}`,
          };
        } else {
          options.headers = {
            ...(headers as IRequestHeaders),
          };
        }
      },
      onRequestError({ request, options, error }) {
        console.log(error, 'onRequestError');
      },
      onResponse({ request, response, options }) {
        return response._data;
      },
      onResponseError({ request, options, response }) {
        return response._data;
      },
    });
    const result = data.value;
    if (error.value || !result) {
      showError('error', error?.value?.statusMessage || '系統錯誤');
      return Promise.reject(error);
      // throw createError({
      //   statusCode: 500,
      //   statusMessage: reqUrl,
      //   message: error.value?.message || '服务器内部错误',
      // });
      // console.log(error);
    }
    return JSON.parse(JSON.stringify(data))._value; // 这里直接返回data或者其他的
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export default class Http {
  get(url: string, params?: any, headers?: any) {
    return fetch(url, { method: 'get', params }, headers);
  }

  post(url: string, body?: any, headers?: any) {
    return fetch(url, { method: 'post', body }, headers);
  }

  put(url: string, body?: any, headers?: any) {
    return fetch(url, { method: 'put', body }, headers);
  }

  delete(url: string, body?: any, headers?: any) {
    return fetch(url, { method: 'delete', body }, headers);
  }
}
