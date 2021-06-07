import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/index';
import { parseHeaders } from './helpers/headers';
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve) => {
        const { data = null, url, method = 'get', headers, responseType } = config
        // 新建 xhr 实例
        const request = new XMLHttpRequest()
        // 建立连接
        request.open(method.toUpperCase(), url, true)

        if (responseType) {
            request.responseType = responseType
        }

        // 处理 state 状态变化
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
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
            resolve(response)
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