<template>
    <div>
        <header-box></header-box>
        <div style="position: relative;margin-top: 20px;">
            <!--微信群-->
            <div class="wxq">
                <div class="wxq_box" v-for="(item, index) in ewmList" :key="index" @click="groupDetail(item.id)">
                    <div>
                        <img :src="item.imgUrl1">
                    </div>
                    <span>{{ item.name }}</span>
                    <p style="text-align: left;padding-left: 5px;"
                       v-if="(new Date() - new Date(item.lastRefreshTime)) < 1000*3600">
                        {{ moment().diff(moment(item.lastRefreshTime), 'minute') }}分钟前更新
                    </p>
                    <p style="text-align: left;padding-left: 5px;"
                       v-if="(new Date() - new Date(item.lastRefreshTime)) < 1000*3600*24">
                        {{ moment().diff(moment(item.lastRefreshTime), 'hour') }}小时前更新
                    </p>
                    <p style="text-align: left;padding-left: 5px;"
                       v-if="(new Date() - new Date(item.lastRefreshTime)) >= 1000*3600*24">
                        {{ moment().diff(moment(item.lastRefreshTime), 'day') }}天前更新
                    </p>
                    <div class="spread_img" v-if="isLogin && item.popularizeCount"></div>
                    <div class="spread_text" v-if="isLogin && item.popularizeCount">可推广</div>
                    <p class="shadow" v-if="isLogin && item.popularizeCount" @click.stop="spread(item.id)">
                        <el-button type="text">点击推广</el-button>
                    </p>
                </div>
            </div>
            <van-pagination
                    v-model="page.current"
                    :total-items="page.total"
                    mode="simple"
                    :items-per-page="page.size"
                    @change="changeSize(page.current)"></van-pagination>
        </div>
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
        name: "list",
        data() {
            return {
                ewmList: [],
                page: {
                    current: 1,
                    size: 18,
                    total: 0
                },
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
                this.$api.getTradeDetail({
                    sectionId: this.$route.query.id && this.$route.query.id !== '' ? this.$route.query.id : '',
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    this.page.total = res.info.total
                    this.ewmList = res.info.list
                })
            },
            // 改变页码
            changeSize(val) {
                console.log(val)
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
    .wxq {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .wxq_box {
            width: 32.33%;
            /*border: 1px solid #ddd;*/
            text-align: center;
            padding: 5px 0;
            border-radius: 8px;
            box-sizing: border-box;
            margin-right: 1%;
            margin-bottom: 10px;
            cursor: pointer;
            position: relative;

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
                height: 30px;
                line-height: 30px;
                background: rgba(#000, .7);
                /*border-bottom-left-radius: 8px;*/
                /*border-bottom-right-radius: 8px;*/
                cursor: pointer;

                .el-button{
                    color: #fff;
                    padding: 0;
                }
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
</style>