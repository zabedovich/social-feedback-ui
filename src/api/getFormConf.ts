import { FormConfig } from '../types/FormConfig'

import { createBaseApi, RequestOptions } from './baseApi'

const baseApi = createBaseApi()

export const getFormConf = (formId: string, options?: RequestOptions) =>
  baseApi.get<FormConfig>(`/feedback-receiver/config/${formId}`, options)
