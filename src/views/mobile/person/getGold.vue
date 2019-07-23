<template>
    <div>
        <van-tabs v-model="articleTabIndex" @click="changeTabs">
            <van-tab v-for="(item, index) in articleTabList" :key="index" :title="item.name"></van-tab>
        </van-tabs>

        <div class="article_index flex">
            <div class="article_index_list" v-for="(item, index) in goldList" :key="index" @click="groupDetail(item.id)"
                 v-if="goldList.length">
                <div style="position: relative;height: 70%;overflow: hidden;">
                    <img :src="item.imgUrl1" alt="">
                    <p class="shadow" @click.stop="spread(item.id)">
                        <el-button type="text">点击赚{{ item.popularizePrice }}金币</el-button>
                    </p>
                </div>
                <p>{{ item.name }}</p>
            </div>
            <p style="text-align: center;font-size: 1.8rem;width: 100%;" v-if="goldList.length === 0">暂无数据</p>
        </div>
        <van-pagination
                v-model="page.current"
                :total-items="page.total"
                mode="simple"
                :items-per-page="page.size"
                @change="changeSize(page.current)"
                v-if="goldList.length"></van-pagination>

        <!--        推广-->
        <van-dialog v-model="spreadBox" width="25%">
            <img :src="spreadImg" alt="">
        </van-dialog>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                spreadImg: '',
                spreadBox: false,
                articleTabIndex: '',
                articleTabList: [],
                goldList: [],
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
            fetchTabs() {
                this.$api.getTradeList().then((res) => {
                    this.articleTabList = res.data
                    this.articleTabList.unshift({
                        name: '全部',
                        id: ''
                    })
                })
            },
            fetchData() {
                this.$api.getEarnedPublishBySectionId({
                    sectionId: this.articleTabIndex,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.goldList = res.info.list
                    }
                })
            },
            // 修改tabs
            changeTabs(index, title) {
                const obj = this.articleTabList.filter((value) => {
                    return title === value.name
                })
                this.articleTabIndex = obj[0].id
                this.fetchData()
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
            },
            // 微信群详情
            groupDetail(id) {
                this.$router.push(`/group/${id}`)
            },
            // 改变页码
            changeSize(val) {
                this.page.current = val
                this.fetchData()
            }
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

            .spread_img {
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 0;
                border-top: 5rem solid #ff7a4a;
                border-right: 5rem solid transparent;
            }

            .spread_text {
                position: absolute;
                top: 8px;
                left: 5px;
                color: #fff;
                text-align: left;
                border-radius: 8px;
            }

            .shadow {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 25px;
                line-height: 25px;
                background: rgba(#000, .7);
                /*border-bottom-left-radius: 8px;*/
                /*border-bottom-right-radius: 8px;*/
                cursor: pointer;
                margin-bottom: 0;

                .el-button {
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
</style>