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
                </div>
            </div>
            <van-pagination
                    v-model="page.current"
                    :total-items="page.total"
                    mode="simple"
                    :items-per-page="page.size"
                    @change="changeSize(page.current)"></van-pagination>
        </div>
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
                    size: 5,
                    total: 0
                }
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