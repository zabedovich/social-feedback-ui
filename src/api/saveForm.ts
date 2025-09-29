import { createBaseApi, RequestOptions } from './baseApi'

const baseApi = createBaseApi()

export const saveForm = (body: object, options?: RequestOptions) =>
  baseApi.post(`/feedback-receiver`, body, options)
