<template>
    <div class="record_m">
        <van-col v-for="(item, index) in recordHeaderList" span="6" :key="index" class="text-center record_header">{{ item }}</van-col>
        <van-row v-for="item in recordList" :key="item.id" class="text-center record_body_m">
            <van-col span="6">
                <span>{{ item.id }}</span>
            </van-col>
            <van-col span="6">
                <span>{{ item.cost }}</span>
            </van-col>
            <van-col span="6">
                <span>{{ item.origin }}</span>
            </van-col>
            <van-col span="6">
                <span>{{ item.modifyTime }}</span>
            </van-col>
        </van-row>
        <van-pagination v-model="page.current"
                        :total-items="page.total"
                        :items-per-page="page.size"
                        @change="changePage(page.current)" style="margin-top: .8rem;">
        </van-pagination>
    </div>
</template>

<script>
    export default {
        name: "record",
        data() {
            return {
                recordList: [],
                page: {
                    current: 1,
                    size: 10,
                    total: 0
                },
                recordHeaderList: ['消费ID', '金币数', '来源', '时间']
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            // 初始化数据
            fetchData() {
                this.$api.getBillDetail({
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.recordList = res.info.list
                        this.recordList.forEach((value, index, array) => {
                            switch (value.type){
                                case 0:
                                    array[index].origin = "发布消费"
                                    break
                                case 1:
                                    array[index].origin = "充值"
                                    break
                                case 2:
                                    array[index].origin = "扫码推广"
                                    break
                                case 3:
                                    array[index].origin = "点赞"
                                    break
                                case 4:
                                    array[index].origin = "创建推广"
                                    break
                                case 5:
                                    array[index].origin = "邀请推广"
                                    break
                                case 6:
                                    array[index].origin = "刷新置顶"
                                    break
                                default:
                                    array[index].origin = "未知"
                                    break
                                // no default
                            }
                        })
                    }
                })
            },
            // 跳页数
            changePage(val) {
                this.page.current = val
                this.fetchData()
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .record_m{
        margin-top: 3rem;

        .record_header{
            line-height: 30px;
            color: #333;
            font-size: 1.6rem;
            font-weight: bold;
            border-bottom: 1px solid #ccc;
        }
        .record_body_m{
            line-height: 30px;
            color: #666;
            font-size: 1.4rem;
            border-bottom: 1px solid #eee;
        }
    }
</style>