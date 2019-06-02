<template>
    <div class="home">
        <!--<header-box actived="/"></header-box>-->
        <el-main>
            <div class="search_img">
                <router-link to="/">
                    <span>微群发布</span>
                </router-link>
                <!--<img src="" alt="">-->
            </div>
            <el-input v-model="search" placeholder="请输入搜索关键词" @keypress.native="searchs(search)">
                <el-button slot="append" icon="el-icon-search" @click="searchs(search)"></el-button>
            </el-input>
            <el-tabs v-model="result" style="margin-top: 20px;" v-if="resultData.length">
                <el-tab-pane :label="`已为您找到${page.total}条结果`" name="result">
                    <!--微信群-->
                    <div class="wxq">
                        <div class="wxq_box" v-for="(item, index) in resultData" :key="index"
                             @click="groupDetail(item.id)">
                            <div>
                                <img :src="item.imgUrl1">
                            </div>
                            <span>{{ item.name }}</span>
                        </div>
                    </div>

                    <el-pagination :current-page.sync="page.current"
                                   :page-size="page.size"
                                   :total="page.total"
                                   background
                                   layout="total, prev, pager, next, jumper"
                                   @size-change="changeSize"
                                   @current-change="changePage" style="float: right;margin-top: 10px;"></el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-main>
        <footer-box></footer-box>
    </div>
</template>

<script>
    //    import headerBox from '@/components/pc/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: "search",
        data() {
            return {
                result: 'result',
                search: '',
                resultData: [],
                page: {
                    current: 1,
                    size: 15,
                    total: 10
                },
                params: {
                    name: this.$route.query.result ? this.$route.query.result : this.search,
                    pageNum: 1,
                    pageSize: 15
                }
            }
        },
        created() {
            this.search = this.$route.query.result ? this.$route.query.result : ''
        },
        mounted() {
            this.fetchData()
        },
        methods: {
            // 初始化数据
            fetchData() {
                this.$api.getSearchResult(this.params).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.resultData = res.info.list
                    }
                })
            },
            // 微信群详情
            groupDetail(id) {
                this.$router.push(`/group/${id}`)
            },
            // 搜索
            searchs(search) {
                this.params.name = search
                this.search = search
                this.page.current = 1
                this.fetchData()
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        result: search
                    }
                })
            },
            // 修改文章每页展示的条数
            changeSize(val) {
                this.page.size = this.params.pageSize = val
                this.fetchData()
            },
            // 修改文章页数
            changePage(val) {
                this.page.current = this.params.pageNum = val
                this.fetchData()
            },
        },
        components: {
//            headerBox,
            footerBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .search_img {
        text-align: center;
        margin: 3% 0;

        span {
            font-size: 40px;
        }
    }

    .wxq {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .wxq_box {
            width: 10.985%;
            text-align: center;
            box-sizing: border-box;
            margin-bottom: 10px;
            cursor: pointer;
            margin-right: 5%;

            &:hover {
                border-color: #3266cc;
            }

            & > last-child {
                margin-right: 0;
            }

            & > div {
                width: 90%;
                height: 0;
                padding: 5%;
                padding-bottom: 100%;
                position: relative;
                border: 1px solid #ddd;
                margin-right: 10px;
                border-radius: 8px;

                img {
                    width: 100%;
                    /*height: 100%;*/
                    /*position: absolute;*/
                    /*left: 10px;*/
                    /*width: 115px;*/
                    /*height: 115px;*/
                }
            }

            span {
                color: #555;
                font-size: 14px;
                margin-top: 8px;
                display: inline-block;
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>