import { request } from '@/utils/request.js'

export const GetSms = data => {
  return request({
    url: '/getSms/', // 此时的接口不能省略两边的 / 否则报错
    method: 'post',
    data
  })
}
