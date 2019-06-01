<template>
    <div class="home">
        <header-box actived="/" :isList="true"></header-box>
            <div style="position: relative;margin-top: 20px;">
                <!--微信群-->
                <div class="wxq" v-if="ewmList.length">
                    <div class="wxq_box" v-for="(item, index) in ewmList" :key="index" @click="groupDetail(item.id)">
                        <div>
                            <img :src="item.imgUrl1">
                        </div>
                        <span>{{ item.name }}</span>
                        <div class="spread_img" v-if="isLogin && item.popularizeCount"></div>
                        <div class="spread_text" v-if="isLogin && item.popularizeCount">可推广</div>
                        <p class="shadow" v-if="isLogin && item.popularizeCount" @click.stop="spread(item.id)">
                            <el-button type="text">点击推广</el-button>
                        </p>
                    </div>
                </div>
            </div>

            <!-- 阅读推荐-->
            <article style="margin-top: 20px;">
                <el-tabs v-model="article" type="border-card" @tab-click="changeArticle(article)">
                    <el-tab-pane v-for="(item, index) in articleData" :key="index" :label="item.name"
                                 :name="String(item.id)">
                        <!--文章-->
                        <div class="index_article">
                            <div class="article_list" v-for="(item, index) in articleList" :key="index" @click="articleDetail(item.id)">
                                <div class="article_img">
                                    <img :src="item.url" alt="">
                                </div>
                                <div class="article_info">
                                    <h3><el-button type="text">{{ item.name }}</el-button></h3>
                                    <p>{{ item.description }}</p>
                                    <div class="article_info_detail">
                                        <span>发布时间：{{ item.createTime }}</span>
<!--                                        <i class="iconai-eye iconfont"></i>-->
<!--                                        <span style="margin-left: 5px;">{{ item.watchNum }}</span>-->
                                    </div>
                                </div>
<!--                                <div class="share">-->
<!--                                    <i class="iconpengyouquan iconfont"></i>-->
<!--                                    <span>分享</span>-->
<!--                                </div>-->
                            </div>
                            <el-pagination :current-page.sync="page.current"
                                           :page-size="page.size"
                                           :total="page.total"
                                           background
                                           layout="total, prev, pager, next, jumper"
                                           @size-change="changeSize"
                                           @current-change="changePage"
                                           style="float: right;margin-top: 10px;"></el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </article>

        <el-dialog :visible.sync="spreadBox" width="25%">
            <img :src="spreadImg" alt="">
        </el-dialog>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/pc/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: 'home',
        data() {
            return {
                ewmList: [],
                article: '',
                articleData: [],
                articleList: [],
                page: {
                    current: 1,
                    size: 5,
                    total: 10
                },
                spreadImg: '',
                spreadBox: false
            }
        },
        computed: {
            isLogin() {
                if (sessionStorage.getItem('user')) {
                    return true
                }
                return false
            }
        },
        created() {
            this.fetchData()
            this.fetchArticle()
        },
        methods: {
            // 初始化数据
            fetchData() {
                const page = {
                    pageNum: 1,
                    pageSize: 15
                }
                this.$api.getTradeDetail(page).then((res) => {
                    this.ewmList = res.info.list
                })

                this.$api.getTradeList().then((res) => {
                    this.articleData = res.data
                    if (this.articleData.length) {
                        this.article = String(this.articleData[0].id)
                    }
                })
            },
            fetchArticle() {
                // 获取文章
                this.$api.getArticleList({
                    sectionId: this.article,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.articleList = res.info.list
                    }
                })
            },
            // 切换正文tabs
            changeTab(val) {
                console.log(val)
            },
            // 跳转文章
            changeArticle(val) {
                if (val === '0') {
                    this.article = ''
                } else {
                    this.article = val
                }
                this.fetchArticle()
            },
            // 修改文章每页展示的条数
            changeSize(val) {
                this.page.size = val
                this.fetchArticle()
            },
            // 修改文章页数
            changePage(val) {
                if (this.article == 0) {
                    this.article = ''
                }
                this.page.current = val
                this.fetchArticle()
            },
            // 微信群详情
            groupDetail(id) {
                this.$router.push(`/group/${id}`)
            },
            // 文章详情
            articleDetail(id) {
                this.$router.push(`/article/${id}`)
            },
            // 推广
            spread(id) {
                this.$api.popularize({
                    codeId: id
                }).then((res) => {
                    if (res) {
                        this.spreadImg = res.url
                        setTimeout(() => {
                            this.spreadBox = true
                        }, 300)
                    }
                })
            }
        },
        components: {
            headerBox,
            footerBox
        }
    }
</script>
<style scoped lang="scss" type="text/scss">
    .wxq {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .wxq_box {
            width: 18.985%;
            border: 1px solid #ddd;
            text-align: center;
            padding: 5px 0;
            border-radius: 8px;
            box-sizing: border-box;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            position: relative;

            .spread_img{
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 0;
                border-top: 70px solid #ff7a4a;
                border-right: 70px solid transparent;
            }
            .spread_text{
                position: absolute;
                top: 8px;
                left: 5px;
                color: #fff;
                text-align: left;
                border-radius: 8px;
            }
            .shadow{
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 100%;
                height: 30px;
                line-height: 30px;
                background: rgba(#000, .7);
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                cursor: pointer;

                .el-button{
                    color: #fff;
                    padding: 0;
                }
            }

            &:hover {
                border-color: #3266cc;
            }

            & > last-child {
                margin-right: 0;
            }

            & > div {
                width: 90%;
                height: 0;
                padding-bottom: 90%;
                position: relative;

                img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 10px;
                    /*width: 115px;*/
                    /*height: 115px;*/
                }
            }

            span {
                color: #555;
                font-size: 12px;
                margin-top: 8px;
                display: inline-block;
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .index_article {
        /*padding: 20px;*/
        /*display: flex;*/
        flex-wrap: wrap;
        width: 100%;

        .article_list {
            /*width: 50%;*/
            /*border-right: 1px solid #eee;*/
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            display: flex;
            padding: 10px 0;
            position: relative;

            /*&:nth-child(even) {*/
            /*    border-right: 0 none;*/
            /*}*/
            /*&:nth-child(odd) {*/
            /*    padding-left: 0;*/
            /*}*/

            .article_img {
                flex: 0 0 180px;

                img {
                    width: 180px;
                }
            }
            .article_info{
                margin-left: 10px;
                width: 300px;
                position: relative;

                h3{
                    .el-button {
                        font-size: 16px;
                        font-weight: normal;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 100%;
                        padding: 0;
                        text-align: left;
                    }
                }
                .article_info_detail{
                    font-size: 12px;
                    position: absolute;
                    bottom: 0;

                    span{
                        margin-right: 10px;
                    }
                    .iconai-eye{
                        color: #ccc;
                        position: relative;
                        top: 2px;
                    }
                }
            }
            .share{
                position: absolute;
                bottom: 10px;
                right: 0;
            }
        }
    }
</style>
