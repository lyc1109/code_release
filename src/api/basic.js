/**
 * 登录、注册和个人信息
 * @author luoyc
 * @created 2019-5-19
 */

import http from '@/utils/https'
// import app from '@/utils/public'

const api = {
    /**
     * 获取用户信息
     * @returns {*}
     */
    getUserInfo() {
        return http.get(`/sys/userInfo`)
    },
    /**
     * 注册
     * @param params 用户注册信息
     * @returns {*}
     */
    register(params = {}) {
        return http.post('/sys/register', params)
    },
    /**
     * 登录
     * @param params 用户登录信息
     * @returns {*}
     */
    login(params = {}) {
        return http.post('/sys/login', params)
    },
    /**
     * 提交重置密码
     * @param params 用户邮箱、图片验证码
     * @returns {*}
     */
    resetPass(params = {}) {
        return http.post('/sys/resetPass', params)
    },
    /**
     * 提交重置密码,通过邮件验证码方式
     * @param params 用户邮箱、密码、邮件发送的验证码
     * @returns {*}
     */
    changePassByMail(params = {}) {
        return http.post('/sys/changePassByMail', params)
    },
    /**
     * 提交修改密码(已登录)
     * @param params 用户邮箱、密码
     * @returns {*}
     */
    changePass(params = {}) {
        return http.post('/sys/changePass', params)
    },
    /**
     * 更新用户信息
     * @param params
     * @returns {*}
     */
    updateUser(params ={}) {
        return http.post('/sys/update', params)
    },
    /**
     * 退出登录
     * @returns {*}
     */
    logout() {
        return http.get('/sys/logout')
    },
    /**
     * 获取图片验证码
     * @returns {*}
     */
    verificationImg() {
        return http.get('/img/verification')
    },
    /**
     * 上传文件
     * @param data
     * @returns {*|AxiosPromise}
     */
    uploadFile(data) {
        return http.postJson('/file/add', data)
    }
}

export default api