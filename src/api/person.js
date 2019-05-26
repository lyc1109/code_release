/**
 * 个人中心
 * @author luoyc
 * @created 2019-5-19
 */

import http from '@/utils/https'
const base = '/buzz/personCenter'

const api = {
    /**
     * 获取所有行业信息
     */
    getTrade() {
        return http.get(`${base}/allSection`)
    },
    /**
     * 获取一个二维码/文章
     * @param params
     */
    getArticle(params = {}) {
        return http.get(`${base}/get`, params)
    },
    /**
     * 获取指定行业的文章信息
     * @param params
     */
    getArticleDetail(params = {}) {
        return http.get(`${base}/getArticleBySectionId`, params)
    },
    /**
     * 获取账单明细
     * @param params
     */
    getBillDetail(params = {}) {
        return http.get(`${base}/getBillDetail`, params)
    },
    /**
     * 获取个人中心信息
     * @param params
     */
    getBuzzInfo(params = {}) {
        return http.get(`${base}/getBuzzInfo`, params)
    },
    /**
     * 获取指定行业的推广信息
     * @param params
     */
    getPopularizeBySectionId(params = {}) {
        return http.get(`${base}/getPopularizeBySectionId`, params)
    },
    /**
     * 获取指定行业的发布信息
     * @param params
     */
    getPublishBySectionId(params = {}) {
        return http.get(`${base}/getPublishBySectionId`, params)
    },
    /**
     * 刷新二维码, 置顶
     * @param params
     */
    refreshCode(params = {}) {
        return http.get(`${base}/refreshCode`, params)
    },
    /**
     * 保存一篇文章
     * @param params
     */
    addArticle(params = {}) {
        return http.post(`${base}/addArticle`, params)
    },
    /**
     * 添加充值记录
     * @param params
     */
    addPayment(params = {}) {
        return http.post(`${base}/addPayment`, params)
    },
    /**
     * 保存一个二维码(包括微信群、公众号、个人微信号、其他)
     * @param params
     */
    addStaticQRCode(params = {}) {
        return http.post(`${base}/addStaticQRCode`, params)
    },
    /**
     * 删除二维码/文章
     * @param params
     */
    deleteArticle(params = {}) {
        return http.post(`${base}/delete`, params)
    },
    /**
     * 邀请推广一个二维码
     * @param params
     */
    invitePopularize(params = {}) {
        return http.post(`${base}/invitePopularize`, params)
    },
    /**
     * 修改资料
     * @param params
     */
    updatePersonalInfo(params = {}) {
        return http.post(`${base}/updatePersonalInfo`, params)
    },
    /**
     * 获取充值选项
     * @returns {*}
     */
    getRechargeSetting() {
        return http.get(`${base}/getRechargeSetting`)
    }
}

export default api