import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types/index';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType, timeout } = config
        // 新建 xhr 实例
        const request = new XMLHttpRequest()
        // 建立连接
        request.open(method.toUpperCase(), url, true)

        if (responseType) {
            request.responseType = responseType
        }
        if (timeout) {
            request.timeout = timeout
        }

        // 处理 state 状态变化
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return
            }
            if (request.status === 0) {
                return
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData =
                responseType && responseType !== 'text' ?
                    request.response :
                    request.responseText
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response)
        }
        function handleResponse(response: AxiosResponse) {
            if (response.status >= 200 && response.status < 300) {
                resolve(response)
            } else {
                // reject(new Error(`Request failed with status code ${response.status}`))
                reject(createError(
                    `Request failed with status code ${response.status}`,
                    config,
                    null,
                    request,
                    response
                ))
            }
        }
        // 错误捕捉
        request.onerror = function handleError() {
            // reject(new Error('Network Error'))
            reject(createError(
                'Network Error',
                config,
                null,
                request
            ))
        }
        // 超时处理
        request.ontimeout = function handleTimeout() {
            // reject(new Error(`Timeout of ${timeout} ms exceeded`))
            reject(createError(
                `Timeout of ${config.timeout} ms exceeded`,
                config,
                'ECONNABORTED',
                request
            ))
        }
        // 处理 headers 中的 content-type
        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })
        request.send(data)
    })
}