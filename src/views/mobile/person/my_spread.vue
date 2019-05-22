<template>
    <div>
        <van-tabs v-model="articleTabIndex" @click="changeTabs">
            <van-tab v-for="(item, index) in articleTabList" :key="index" :title="item.name"></van-tab>
        </van-tabs>

        <div class="article_index_main" v-for="(item, index) in articleData" :key="index" v-if="articleData.length">
            <div class="article_index_img" v-if="item.url && item.url !== ''">
                <img :src="item.url" alt="">
            </div>
            <div class="article_index_main_info">
                <h2>{{ item.name }}</h2>
                <div class="article_index_info">
                    <span>推广 <b>{{ item.typ }}</b>次，赚取<b>{{ item.popularizePrice }}</b>金币</span>
                    <van-icon name="delete" style="float: right;" @click.stop="del(item)"></van-icon>
                </div>
            </div>
        </div>
        <van-pagination
                v-model="page.current"
                :total-items="page.total"
                mode="simple"
                :items-per-page="page.size"
                @change="changeSize(page.current)"
                v-if="articleData.length"
        ></van-pagination>
        <p class="text-center" style="margin-top: 60%; font-size: 1.8rem;">暂无数据</p>
    </div>
</template>

<script>
    import { Dialog, Toast } from 'vant'

    export default {
        name: "my_spread",
        data() {
            return {
                articleTabIndex: 0,
                articleTabList: [],
                articleTab: '',
                articleData: [],
                page: {
                    current: 1,
                    size: 5,
                    total: 0
                }
            }
        },
        created() {
            this.fetchTabs()
            this.fetchData()
        },
        methods: {
            // 初始化数据
            fetchData() {
                this.$api.getPopularizeBySectionId({
                    sectionId: this.articleTab,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.articleData = res.info.list
                    }
                })
            },
            // 初始化tabs
            fetchTabs() {
                this.$api.getTrade().then((res) => {
                    this.articleTabList = res.data
                    this.articleTabList.unshift({
                        name: '全部',
                        id: ''
                    })
                })
            },
            // 修改tabs
            changeTabs(index, title) {
                // console.log(title)
                const obj = this.articleTabList.filter((value) => {
                    return title === value.name
                })
                this.articleTab = obj[0].id
                this.fetchData()
            },
            // 改变页码
            changeSize(val) {
                this.page.current = val
                this.fetchData()
            },
            // 删除
            del(data) {
                Dialog.confirm({message: '确定删除？'})
                    .then(() => {
                        this.$api.deleteArticle({
                            id: data.id
                        }).then((res) => {
                            if (res) {
                                Toast.success('删除成功')
                                this.fetchData()
                            }
                        })
                    })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
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
            white-space: nowrap;
            height: 24px;
        }

        .article_index_info{
            position: absolute;
            bottom: 0;
            width: 100%;

            .van-icon{
                float: right;
                color: #ef3b3b;

                &:before {
                    font-size: 1.6rem;
                }
            }
        }

        span {
            color: #B4B4B4;
            font-size: 1.2rem;

            b{
                color: #ff6464;
                font-size: 1.4rem;
            }
        }

        &:last-child {
            border-bottom: 0 none;
        }
    }
</style>