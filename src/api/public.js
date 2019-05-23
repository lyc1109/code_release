/**
 * 展示页面
 * @author luoyc
 * @created 2019-5-19
 */

import http from '@/utils/https'
const base = '/api/buzz/public'

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
        return http.get(`${base}/getPublishDetail`, params)
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
    }
}

export default api