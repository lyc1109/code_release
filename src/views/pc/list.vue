<template>
    <div>
        <div class="home">
            <header-box actived="/area"></header-box>
<!--            <el-carousel direction="vertical" height="30px" class="notice" v-if="noticeList.length">-->
<!--                <el-carousel-item v-for="(item,index) in noticeList" :key="index">-->
<!--                    <p>{{ item.title }}</p>-->
<!--                </el-carousel-item>-->
<!--            </el-carousel>-->
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
                <el-pagination :current-page.sync="page.current"
                               :page-size="page.size"
                               :total="page.total"
                               background
                               layout="total, prev, pager, next, jumper"
                               @size-change="changeSize"
                               @current-change="changePage"
                               style="position: absolute;right: 0;margin-top: 10px;" v-if="page.total"></el-pagination>

                <p v-if="!ewmList.length" class="text-center" style="font-size: 20px;">暂无数据</p>
            </div>
        </div>
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
        name: "area",
        data() {
            return {
                ewmList: [],
                page: {
                    current: 1,
                    size: 15,
                    total: 0
                },
                noticeList: [
                    { title: '我是公告1' },
                    { title: '我是公告2' },
                    { title: '我是公告3' }
                ],
                spreadImg: '',
                spreadBox: false
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            $route(to, from) {
                if (to.query.id) {
                    this.fetchData()
                }
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
        methods: {
            // 初始化数据
            fetchData() {
                const params = {
                    sectionId: this.$route.query.id && this.$route.query.id !== '' ? this.$route.query.id : '',
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }
                this.$api.getTradeDetail(params).then((res) => {
                    if (res) {
                        console.log(res)
                        this.page.total = res.info.total
                        this.ewmList = res.info.list
                    }
                })
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
            // 跳转到二维码详情页
            groupDetail(id) {
                this.$router.push(`/group/${id}`)
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
    .home{
        padding-bottom: 50px;
    }
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
    .notice{
        border: 1px solid #C9DFF4;
        background: #F5F8FC;
        padding-left: 10px;
        border-radius: 3px;
        margin-top: 10px;

        .el-carousel__item{
            line-height: 30px;

            p{
                color: #1479d7;
                width: 98%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>