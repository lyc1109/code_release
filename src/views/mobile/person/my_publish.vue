<template>
    <div>
        <van-tabs v-model="articleTabIndex" @change="changeTabs">
            <van-tab v-for="(item, index) in articleTabList" :key="index" :title="item.name"></van-tab>
        </van-tabs>
        <div class="article_index_main" v-for="(item, index) in articleData" :key="index" v-if="articleData.length" @click="toDetail(item)">
            <div class="article_index_img" v-if="item.url && item.url !== ''">
                <img :src="item.url" alt="">
            </div>
            <div class="article_index_main_info">
                <h2>{{ item.name }}</h2>
                <p>{{ item.description }}</p>
                <div class="article_index_info">
                    <p>剩余{{ item.popularizeCount }}次({{ item.popularizePrice }}元/次)推广</p>
                    <span>{{ item.section }}</span>
                    <span style="margin-left: .4rem;">{{ item.createTime }}</span>
                    <van-icon name="delete" @click.stop="del(item)"></van-icon>
                    <van-icon name="add" @click.stop="toInvite(item)" v-if="$route.query.type === 'fb'"></van-icon>
                    <van-icon name="upgrade" @click.stop="toTop(item)" v-if="$route.query.type === 'fb'"></van-icon>
                    <van-icon name="edit" @click.stop="edit(item)" v-if="$route.query.type === 'wz'"></van-icon>
                </div>
            </div>
        </div>
        <van-pagination
                v-model="page.current"
                :total-items="page.total"
                mode="simple"
                :items-per-page="page.size"
                @change="changeSize(page.current)"
                v-if="articleData.length">
        </van-pagination>
    </div>
</template>

<script>
    import {Dialog, Toast} from 'vant'

    export default {
        name: "my_publish",
        data() {
            return {
                articleData: [],
                articleTabIndex: 0,
                articleTabList: [],
                articleTab: '',
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
                if (this.$route.query.type) {
                    if (this.$route.query.type === 'fb')
                        this.fetchPublish()
                    else
                        this.fetchArticle()
                }
            },
            // 获取发布列表
            fetchPublish() {
                this.$api.getPublishBySectionId({
                    sectionId: this.articleTab,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.articleData = res.info.list
                        this.articleData.forEach((value, index, arr) => {
                            this.articleTabList.forEach((data) => {
                                if (value.sectionId === data.id) {
                                    arr[index].section = data.name
                                }
                            })
                        })
                    }
                })
            },
            // 文章列表
            fetchArticle() {
                this.$api.getArticleDetail({
                    sectionId: this.articleTab,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.articleData = res.info.list
                        this.articleData.forEach((value, index, arr) => {
                            this.articleTabList.forEach((data) => {
                                if (value.sectionId === data.id) {
                                    arr[index].section = data.name
                                }
                            })
                        })
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
                const obj = this.articleTabList.filter((value) => {
                    return title === value.name
                })
                this.articleTab = obj[0].id
                this.fetchData()
            },
            // 改变页码
            changeSize(val) {
                // console.log(val)
                this.page.current = val
                this.fetchData()
            },
            // 编辑
            edit(data) {
                this.$router.push({
                    path: '/publish_article',
                    query: {
                        id: data.id
                    }
                })
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
                                if (this.$route.query.type === 'fb')
                                    this.fetchPublish()
                                else
                                    this.fetchArticle()
                            }
                        })
                    })
            },
            // 详情页
            toDetail(data) {
                if (this.$route.query.type === 'fb')
                    this.$router.push(`/group/${data.id}`)
                else
                    this.$router.push(`/article/${data.id}`)
            },
            // 邀请推广
            toInvite(data) {
                this.$router.push({
                    path: `/invite/${data.id}`,
                    query: {
                        id: data.sectionId
                    }
                })
            },
            // 置顶
            toTop(data) {
                this.$api.refreshCode({
                    id: data.id
                }).then((res) => {
                    if (res) {
                        Toast.success('置顶成功')
                        this.fetchPublish()
                    }
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

            &>p{
                display: inline-block;
                line-height: 20px;
                height: 20px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
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

        .article_index_info {
            position: absolute;
            bottom: 0;
            width: 100%;

            .van-icon {
                float: right;

                &:before {
                    font-size: 1.6rem;
                }
            }

            .van-icon-edit {
                color: #1784ef;
                margin-right: .3rem;
            }

            .van-icon-delete {
                color: #ef3b3b;
            }
            .van-icon-add {
                color: #4eb4ff;
            }
            .van-icon-upgrade{
                color: #68d227;
            }
        }

        span {
            color: #B4B4B4;
            font-size: 1.2rem;
        }

        .van-icon {
            color: #bbb;
            font-size: 1.2rem;

            &:before {
                position: relative;
                top: 3px;
                margin-right: 3px;
                font-size: 1.4rem;
            }
        }

        &:last-child {
            border-bottom: 0 none;
        }
    }
</style>