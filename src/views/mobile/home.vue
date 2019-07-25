<template>
    <div>
        <header-box></header-box>
        <van-notice-bar v-for="(item, index) in noticeList" :key="index" :text="item" left-icon="volume-o"
                        color="#1989fa"
                        background="#ecf9ff"></van-notice-bar>
        <!--        微信群-->
        <div class="article_index flex">
            <div class="article_index_list" v-for="(item, index) in ewmList" :key="index" @click="groupDetail(item.id)" v-if="ewmList.length && item.modelType !== 2">
                <img :src="item.imgUrl1" alt="">
                <p>{{ item.name }}</p>
                <p style="text-align: left;padding-left: 5px;"
                   v-if="(new Date() - new Date(item.lastRefreshTime)) < 1000*3600">
                    {{ moment().diff(moment(item.lastRefreshTime), 'minute') }}分钟前更新
                </p>
                <p style="text-align: left;padding-left: 5px;"
                   v-if="(new Date() - new Date(item.lastRefreshTime)) < 1000*3600*24 && (new Date() - new Date(item.lastRefreshTime)) > 1000*3600">
                    {{ moment().diff(moment(item.lastRefreshTime), 'hour') }}小时前更新
                </p>
                <p style="text-align: left;padding-left: 5px;"
                   v-if="(new Date() - new Date(item.lastRefreshTime)) >= 1000*3600*24">
                    {{ moment().diff(moment(item.lastRefreshTime), 'day') }}天前更新
                </p>
<!--                <div class="spread_img" v-if="isLogin && item.popularizeCount"></div>-->
                <!--<div class="spread_text" v-if="isLogin && item.popularizeCount">可推广</div>-->
<!--                <p class="shadow" v-if="isLogin && item.popularizeCount" @click.stop="spread(item.id)">-->
<!--                    <el-button type="text">点击推广</el-button>-->
<!--                </p>-->
            </div>
        </div>
        <!--微信文章-->
        <div class="article_index_title"><span>热门微信文章</span></div>
        <van-tabs v-model="articleTabIndex" @change="changeTabs">
            <van-tab v-for="(item, index) in articleTabList" :key="index" :title="item.name" v-if="item.modelType === 2"></van-tab>
        </van-tabs>
        <div class="article_index_main" v-for="(item, index) in articleData" :key="index" @click="articleDetail(item.id)" v-if="articleData.length && item.modalType === 2">
            <div class="article_index_img" v-if="item.url && item.url !== ''">
                <img :src="item.url" alt="">
            </div>
            <div class="article_index_main_info">
                <h2>{{ item.name }}</h2>
                <p>{{ item.description }}</p>
                <div class="article_index_info">
                    <span>{{ item.modifyTime }}</span>
<!--                    <van-icon name="eye" style="float: right;">{{ item.watched }}</van-icon>-->
                </div>
                <!--                <span>{{ listData.length > 0 ? item.realTime : new Date() | moment('YYYY/MM/DD HH:mm') }}</span>-->
            </div>
        </div>
        <van-pagination
                v-model="page.current"
                :total-items="page.total"
                mode="simple"
                :items-per-page="page.size"
                @change="changeSize(page.current)"
                v-if="articleData.length"
        />
<!--        推广-->
        <van-dialog v-model="spreadBox" width="25%">
            <img :src="spreadImg" alt="">
        </van-dialog>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/mobile/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: "home",
        data() {
            return {
                ewmList: [],
                articleData: [],
                articleTabIndex: 0,
                articleTabList: [],
                articleTab: '',
                page: {
                    current: 1,
                    size: 5,
                    total: 0
                },
                spreadImg: '',
                spreadBox: false,
                noticeList: []
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
            this.fetchNotice()
        },
        methods: {
            // 初始化数据
            fetchData() {
                const page = {
                    pageNum: 1,
                    pageSize: 18
                }
                this.$api.getTradeDetail(page).then((res) => {
                    this.ewmList = res.info.list
                })

                this.$api.getTradeList().then((res) => {
                    this.articleTabList = res.data
                    this.articleTabList.unshift({
                        name: '全部',
                        id: ''
                    })
                })
            },
            // 通知栏
            fetchNotice() {
                this.noticeList = []
                this.$api.getHomePageInfo().then((res) => {
                    if (res) {
                        this.noticeList.push(res.info)
                    }
                })
            },
            fetchArticle() {
                // 获取文章
                this.$api.getArticleList({
                    sectionId: this.articleTab === 0 ? '' : this.articleTab,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.articleData = res.info.list
                    }
                })
            },
            // 修改tabs
            changeTabs(index, title) {
                const obj = this.articleTabList.filter((value) => {
                    return title === value.name
                })
                this.articleTab = obj[0].id
                this.fetchArticle()
            },
            // 改变页码
            changeSize(val) {
                console.log(val)
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
    .article_index {
        flex-wrap: wrap;
        margin-top: 2rem;
        margin-left: 2%;

        .article_index_list {
            width: 29.33%;
            padding-right: 2%;
            text-align: center;
            position: relative;
            margin: 0 2% 2% 0;

            .spread_img{
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 0;
                border-top: 5rem solid #ff7a4a;
                border-right: 5rem solid transparent;
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
                height: 25px;
                line-height: 25px;
                background: rgba(#000, .7);
                /*border-bottom-left-radius: 8px;*/
                /*border-bottom-right-radius: 8px;*/
                cursor: pointer;

                .el-button{
                    color: #fff;
                    padding: 0;
                }
            }

            img {
                width: 80%;
            }

            p {
                line-height: 25px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 25px;
            }
        }
    }
    .article_index_title{
        border-left: 4px solid #2ca0ff;
        border-bottom: 1px solid #ececec;
        line-height: 30px;
        margin-top: 2rem;
        
        span{
            margin-left: 10px;
            font-size: 1.6rem;
            color: #333;
        }
    }
    .article_index_main {
        display: flex;
        padding: 1rem;
        border-bottom: 1px solid #ececec;

        .article_index_img {
            flex: 0 0 30%;
            margin-right: 1rem;
        }

        .article_index_main_info {
            flex: 1;
            margin-left: .17rem;
            position: relative;

            p{
                width: 97%;
                height: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                /*white-space: nowrap;*/
                display: inline-block;
            }
        }

        h2 {
            font-size: 1.8rem;
            font-weight: bold;
            color: #333;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            line-clamp: 2;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            height: 48px;
            margin-bottom: 24px;
        }

        span {
            color: #B4B4B4;
            font-size: 1.2rem;
            position: absolute;
            bottom: 0;
        }
        .van-icon{
            color: #bbb;
            font-size: 1.2rem;

            &:before{
                position: relative;
                top: 3px;
                margin-right: 3px;
                font-size: 1.4rem;
            }
        }
        &:last-child{
            border-bottom: 0 none;
        }
    }
</style>