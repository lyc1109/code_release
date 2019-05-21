<template>
    <div class="home">
        <header-box actived="/"></header-box>
            <div style="position: relative;margin-top: 20px;">
                <!--微信群-->
                <div class="wxq" v-if="ewmList.length">
                    <div class="wxq_box" v-for="(item, index) in ewmList" :key="index" @click="groupDetail(item.id)">
                        <div>
                            <img :src="item.imgUrl1">
                        </div>
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>

            <!-- 阅读推荐-->
            <article style="margin-top: 20px;">
                <el-tabs v-model="article" type="border-card" @tab-click="changeArticle(article)">
                    <el-tab-pane v-for="(item, index) in articleData" :key="index" :label="item.name"
                                 :name="item.value">
                        <!--文章-->
                        <div class="index_article">
                            <div class="article_list" v-for="(item, index) in articleList" :key="index" @click="articleDetail(item.id)">
                                <div class="article_img">
                                    <img :src="item.imgUrl" alt="">
                                </div>
                                <div class="article_info">
                                    <h3><el-button type="text">{{ item.title }}</el-button></h3>
                                    <p>{{ item.desc }}</p>
                                    <div class="article_info_detail">
                                        <span>发布时间：{{ item.created }}</span>
                                        <i class="iconai-eye iconfont"></i>
                                        <span style="margin-left: 5px;">{{ item.watchNum }}</span>
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
                                           @current-change="changePage" style="float: right;margin-top: 10px;"></el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </article>
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
                article: 'tj',
                articleData: [
                    {name: '阅读推荐', value: 'tj'},
                    {name: '微商杂谈', value: 'zt'},
                    {name: '养生之道', value: 'ys'}
                ],
                articleList: [
                    {
                        id: '1',
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    },
                    {
                        id: '2',
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    },
                    {
                        id: '3',
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    },
                    {
                        id: '4',
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    }
                ],
                page: {
                    current: 1,
                    size: 5,
                    total: 10
                },
            }
        },
        created() {
            this.fetchData()
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
            },
            // 切换正文tabs
            changeTab(val) {
                console.log(val)
            },
            // 更多微信群
            // moreEWM() {
            //     this.$router.push('/')
            // },
            // 跳转文章
            changeArticle(val) {
                console.log(val)
            },
            // 修改文章每页展示的条数
            changeSize(val) {
                this.page.size = val
                this.fetchData()
            },
            // 修改文章页数
            changePage(val) {
                this.page.current = val
                this.fetchData()
            },
            // 微信群详情
            groupDetail(id) {
                this.$router.push(`/group/${id}`)
            },
            // 文章详情
            articleDetail(id) {
                this.$router.push(`/article/${id}`)
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
                /*width: 300px;*/
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
