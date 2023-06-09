// import { hash } from 'ohash';
import { showError } from '@/utilities/message';
import { IRequestHeaders } from '~/interface/user';
import { useLoadingStore } from '@/store/loading';
import { storeToRefs } from 'pinia';

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
const fetch = async (url: string, options?: any, headers?: any, isShowLoading: boolean = true) => {
  // 開啟 loading
  if (isShowLoading){
    showLoadingMask();
  }
  
  try {
    const {
      public: { apiBase },
    } = useRuntimeConfig(); // 3.0正式版环境变量要从useRuntimeConfig里的public拿
    const reqUrl = apiBase + url; // 你的接口地址

    // 设置key
    // const key = hash(options + url);

    // 可以设置默认headers例如
    // const customHeaders = { token: useCookie('token').value, ...headers };

    const { data, error } = await useFetch(reqUrl, {
      // initialCache: false,
      ...options,
      onRequest({ options }) {
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
      onRequestError() {},
      onResponse({ response }) {
        hideLoadingMask(); // 關閉 loading
        return response._data;
      },
      onResponseError({ response }) {
        hideLoadingMask(); // 關閉 loading
        return response._data;
      },
    });
    const result = data.value;
    if (error.value || !result) {
      hideLoadingMask(); // 關閉 loading
      showError('error', error?.value?.data?.message || '系統錯誤');
      return Promise.reject(error?.value?.data?.message || '系統錯誤');
      // throw createError({
      //   statusCode: 500,
      //   statusMessage: reqUrl,
      //   message: error.value?.message || '服务器内部错误',
      // });
      // console.log(error);
    }
    hideLoadingMask(); // 關閉 loading
    return JSON.parse(JSON.stringify(data))._value; // 这里直接返回data或者其他的
  } catch (err) {
    hideLoadingMask(); // 關閉 loading
    return Promise.reject(err);
  }
};

export default class Http {
  get(url: string, params?: any, headers?: any, isShowLoading?: boolean) {
    return fetch(url, { method: 'get', params }, headers, isShowLoading);
  }

  post(url: string, body?: any, headers?: any, isShowLoading?: boolean) {
    return fetch(url, { method: 'post', body }, headers, isShowLoading);
  }

  put(url: string, body?: any, headers?: any, isShowLoading?: boolean) {
    return fetch(url, { method: 'put', body }, headers, isShowLoading);
  }

  delete(url: string, body?: any, headers?: any, isShowLoading?: boolean) {
    return fetch(url, { method: 'delete', body }, headers, isShowLoading);
  }
}

/* 開啟 Loading 圈圈 */
function showLoadingMask() {
  const loading = useLoadingStore();
  const { setLoadingCount, showLoading } = loading;
  const { loadingCount } = storeToRefs(loading);

  setLoadingCount(loadingCount.value + 1);
  showLoading();
}

/* 關掉 Loading 圈圈 */
function hideLoadingMask() {
  const loading = useLoadingStore();
  const { setLoadingCount, hideLoading } = loading;
  const { loadingCount } = storeToRefs(loading);

  setLoadingCount(loadingCount.value - 1);
  if (loadingCount.value <= 0){
    setLoadingCount(0);
    hideLoading();
  }
}
