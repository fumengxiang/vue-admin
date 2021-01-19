import axios from 'axios'

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api' // 如果是开发环境就给访问的接口添加字符串/api
export const request = axios.create({
  baseURL: BASEURL,
  timeout: 15000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
