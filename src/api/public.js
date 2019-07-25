/**
 * 展示页面
 * @author luoyc
 * @created 2019-5-19
 */

import http from '@/utils/https'
const base = '/buzz/public'

const api = {
    /**
     * 获取所有行业信息
     */
    getTradeList() {
        return http.get(`${base}/allSection`)
    },
    /**
     * 获取指定行业的发布信息
     * @param params
     */
    getTradeDetail(params = {}) {
        return http.get(`${base}/getPublishBySectionId`, params)
    },
    /**
     * 获取二维码详情
     * @param params
     */
    getCodeDetail(params = {}) {
        return http.get(`${base}/getDetail`, params)
    },
    /**
     * 搜索结果
     * @param params
     */
    getSearchResult(params = {}) {
        return http.get(`${base}/search`, params)
    },
    /**
     * 点赞
     * @param params
     */
    getStar(params = {}) {
        return http.get(`${base}/star`, params)
    },
    /**
     * 推广一个二维码, 生成活码, 需登录
     * @param params
     * @returns {*|AxiosPromise}
     */
    popularize(params = {}) {
        return http.post(`${base}/popularize`, params)
    },
    /**
     * 获取指定行业的文章信息
     * @param params
     * @returns {*}
     */
    getArticleList(params = {}) {
        return http.get(`${base}/getArticleBySectionId`, params)
    },
    /**
     * 获取指定行业的文章详情
     * @param params
     * @returns {*}
     */
    getArticleDetailPublic(params = {}) {
        return http.get(`${base}/getDetail`, params)
    },
    /**
     * 联系客服QQ
     * @param params
     * @returns {*}
     */
    getServiceQQ(params = {}) {
        return http.post(`${base}/getServiceQQ`, params)
    },
     /**
     * 获取赚金币列表页数据
     * @param params
     * @returns {*}
     */
    getEarnedPublishBySectionId(params = {}) {
        return http.get(`${base}/getEarnedPublishBySectionId`, params)
    },
    /**
     * 获取手机端二维码
     * @returns {*}
     */
    getMobileQRCode() {
        return http.get(`${base}/getMobileQRCode`)
    },
    /**
     * 获取邮箱
     * @returns {*}
     */
    getServiceMail() {
        return http.get(`${base}/getServiceMail`)
    },
    /**
     * 获取首页滚动信息
     * @returns {*}
     */
    getHomePageInfo() {
        return http.get(`${base}/getHomePageInfo`)
    }
}

export default api