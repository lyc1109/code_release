<template>
    <div>
        <header-box></header-box>
        <!--        微信群-->
        <div class="article_index flex">
            <div class="article_index_list" v-for="(item, index) in ewmList" :key="index" @click="groupDetail(item.id)" v-if="ewmList.length">
                <img :src="item.imgUrl1" alt="">
                <p>{{ item.name }}</p>
            </div>
        </div>
        <!--微信文章-->
        <div class="article_index_title"><span>热门微信文章</span></div>
        <van-tabs v-model="articleTabIndex" @change="changeTabs">
            <van-tab v-for="(item, index) in articleTabList" :key="index" :title="item.name"></van-tab>
        </van-tabs>
        <div class="article_index_main" v-for="(item, index) in articleData" :key="index" @click="articleDetail(item.id)" v-if="articleData.length">
            <div class="article_index_img" v-if="item.cover && item.cover !== ''">
                <img :src="item.cover" alt="">
            </div>
            <div class="article_index_main_info">
                <h2>{{ item.name }}</h2>
                <div class="article_index_info">
                    <span>{{ item.created }}</span>
                    <van-icon name="eye" style="float: right;">{{ item.watched }}</van-icon>
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
                articleData: [
                    { name: '微信文章1', cover: 'https://img8.souweixin.com/20190515/38/5ba488457bbc57bcc05d69a7f75e9bb5.jpeg', created: '2019-05-15', watched: 200 },
                    { name: '微信文章1', cover: 'https://img8.souweixin.com/20190515/38/5ba488457bbc57bcc05d69a7f75e9bb5.jpeg', created: '2019-05-15', watched: 200 }
                ],
                articleTabIndex: 0,
                articleTabList: [
                    {name: '阅读推荐', value: 'tj'},
                    {name: '微商杂谈', value: 'zt'},
                    {name: '养生之道', value: 'ys'}
                ],
                articleTab: '',
                page: {
                    current: 1,
                    size: 5,
                    total: 0
                }
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
            // 修改tabs
            changeTabs(index, title) {
                const obj = this.articleTabList.filter((value) => {
                    return title === value.name
                })
                this.articleTab = obj[0].value.value
            },
            // 改变页码
            changeSize(val) {
                console.log(val)
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
    .article_index {
        flex-wrap: wrap;
        margin-top: 2rem;

        .article_index_list {
            width: 31.33%;
            padding-right: 2%;
            text-align: center;

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