import axios from 'axios'
import Vue from 'vue'
import Element from 'element-ui'
import router from '@/router'

// 常量配置
const isProduct = process.env.NODE_ENV === "production"
const requestTimeOut = 30000
const origin = window.location.origin
const baseUrl = isProduct ? origin + process.env.VUE_APP_BASE_API : process.env.VUE_APP_BASE_API

// 设置ContentType
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 打印请求参数
// axios.defaults.transformRequest = [function (data) {
//   if (data && !isProduct) {
//     console.log('请求参数：' + JSON.stringify(data))
//   }
//   return data
// }]

// http request 拦截器
axios.interceptors.request.use(
    (config) => {
        config.headers['x-requested-from'] = "apiHttpRequest"
        config.headers['Cache-Control'] = 'no-cache'
        config.headers.apiRequest = true
        return config
    },
    (err) => Promise.reject(err))

// ========================================================
// http response 拦截器

// 错误消息广播
let emitError = (errorMsg) => {
    let msg = "Ops...未知请求异常"
    if (errorMsg && errorMsg !== null && errorMsg !== "") {
        msg = "系统请求异常：" + JSON.stringify(errorMsg)
        Element.Message.error(msg)
    }
    Vue.bus.emit("toast-error", msg)
}

axios.interceptors.response.use(
    (response) => {
        // console.log(response)
        // hideLoading()
        const respData = response.data
        // console.log(respData)
        // 状态码为200表示请求成功，否则失败
        if (response.status === 200 && respData.status) {
            if (respData.data !== null) {
                return respData.data
            }
            return respData
        } else if (!respData.status) {
            // console.log(window.location)
            // const arr = ['home', 'list', 'group', 'article', 'search', 'login', 'register', 'forget']
            // const obj = arr.filter((value) => {
            //     return window.location.hash.includes(value)
            // })
            // if (!obj.length)
            if (respData.msg !== '未登录!') {
                Element.Message.error(respData.msg)
            }
            // return response
        }
        // else {
        //     Element.Message.error(respData.msg)
        //     // 未授权登录
        //     const httpStatusCode = respData.httpStatusCode
        //     if(httpStatusCode === 401 || respData.code === 1200) {
        //         Vue.bus.emit("oauth")
        //     } else if(httpStatusCode === 404 || httpStatusCode === 500) {
        //         sessionStorage.setItem('setErrorCode', httpStatusCode)
        //         // store.commit(types.common.setErrorCode, httpStatusCode)
        //     } else if(httpStatusCode === 302) {
        //         // 后台资源路径重定向，不做处理
        //     } else {
        //         emitError((respData.returnMsg || respData.msg) + "(" + (respData.returnCode || respData.code) + ")")
        //         console.log(respData)
        //         Element.Message.error(respData.returnMsg || respData.msg)
        //     }
        //     //console.log("请求成功：" + JSON.stringify(respData))
        //     return Promise.reject(respData)
        // }
    },
    (error) => {
        const response = error.response
        let errMsg = ""

        if (!isProduct) {
            console.log("系统请求异常...")
            console.log(JSON.stringify(error))
        }

        //console.log("请求失败：" + JSON.stringify(response))
        if (response && response.data) {
            // const httpStatusCode = response.data.httpStatusCode

            // 未授权登录
            // if(httpStatusCode=== 401 || response.data.returnCode === 1200 || response.data.code === 1200) {
            //     Vue.bus.emit("oauth")
            // } else if(httpStatusCode === 404 || httpStatusCode === 500) {
            //     sessionStorage.setItem('setErrorCode', httpStatusCode)
            //     // store.commit(types.common.setErrorCode, httpStatusCode)
            // }  else if(httpStatusCode === 302) {
            //     // 后台资源路径重定向，不做处理
            // }  else {
            // 其它错误信息处理
            if (response.data.returnMsg) {
                errMsg = response.data.returnMsg + "(" + response.data.returnCode + ")"
            } else if (response.data.errMsg) {
                errMsg = response.data.errMsg + "(" + response.data.code + ")"
            }
            emitError(errMsg)
            Element.Message.error(errMsg)
            // }
        }
        //
        return Promise.reject(errMsg)
    }
)

export default {

    /**
     * POST 请求
     *
     * @param url
     * @param params
     * @param isShowLoading
     * @param data
     * @returns {AxiosPromise}
     */
    post: function (url, params = {}, data = {}) {
        // showLoading(isShowLoading)

        return axios({
            method: 'POST',
            url: baseUrl + url,
            params: params,
            data: data,
            timeout: requestTimeOut
        })
    },

    /**
     * 通过JSON Post数据
     * @param url
     * @param requestBody
     */
    postJson: function (url = "", requestBody = {}) {
        return axios({
            method: 'POST',
            url: baseUrl + url,
            data: requestBody,
            timeout: requestTimeOut,
            headers: {'Content-Type': 'application/json'},
        })
    },

    /**
     * GET 请求
     *
     * @param url
     * @param params
     * @param isShowLoading
     * @returns {AxiosPromise}
     */
    get: function (url, params = {}) {
        // showLoading(isShowLoading)

        return axios({
            method: 'GET',
            url: baseUrl + url,
            params: params,
            timeout: requestTimeOut
        })
    },

    /**
     * DELETE请求
     *
     * @param url
     * @param params
     * @param isShowLoading
     */
    del: function (url, params = {}) {
        // showLoading(isShowLoading)

        return axios({
            method: 'DELETE',
            url: baseUrl + url,
            params: params,
            timeout: requestTimeOut
        })
    },

    /**
     * PUT 请求
     *
     * @param url
     * @param params
     * @param isShowLoading
     */
    put: function (url, params = {}) {
        // showLoading(isShowLoading)

        return axios({
            method: 'PUT',
            url: baseUrl + url,
            params: params,
            timeout: requestTimeOut
        })
    },

    /**
     * AJAX请求，自行组装参数
     *
     * @param options
     * @param isShowLoading
     */
    ajax: function (options = {}) {
        // showLoading(isShowLoading)

        return axios(options)
    }
}