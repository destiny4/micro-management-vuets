import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

class CustomError extends Error {
  data: any;
  response: any;
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
// response 拦截器
service.interceptors.response.use(
  (response) => {
    let data;
    if (response.data === undefined) {
      data = JSON.parse(response.request.responseText);
    } else {
      data = response.data;
    }
    if (
      data.result.code === -1000002 ||
      data.result.code === 50012 ||
      data.result.code === 50014
    ) {
      // to re-login
      MessageBox.confirm(
        "You have been logged out, you can cancel to stay on this page, or log in again",
        "Confirm logout",
        {
          confirmButtonText: "Re-Login",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(() => {
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      });
    }
    if (data.result.code !== 0) {
      Message({
        message: data.result.message,
        type: "error",
        duration: 5 * 1000,
      });
      const err = new CustomError(data.result.message);
      err.data = data;
      err.response = response;
      throw err;
    }
    return data;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误";
          break;
        case 401:
          err.message = "未授权，请登录";
          break;
        case 403:
          err.message = "拒绝访问";
          break;
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          err.message = "请求超时";
          break;
        case 500:
          err.message = "服务器内部错误";
          break;
        case 501:
          err.message = "服务未实现";
          break;
        case 502:
          err.message = "网关错误";
          break;
        case 503:
          err.message = "服务不可用";
          break;
        case 504:
          err.message = "网关超时";
          break;
        case 505:
          err.message = "HTTP版本不受支持";
          break;
        default:
      }
    }
    console.error(err);
    Message({
      message: err.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(err); // 返回接口返回的错误信息
  }
);

export default service;
