<template>
    <div class="record_m">
        <van-col v-for="(item, index) in recordHeaderList" span="6" :key="index" class="text-center record_header">{{ item }}</van-col>
        <van-row v-for="(item, index) in recordList" :key="index" class="text-center record_body_m">
            <van-col span="6">
                <span>{{ item.id }}</span>
            </van-col>
            <van-col span="6">
                <span>{{ item.gold }}</span>
            </van-col>
            <van-col span="6">
                <span>{{ item.origin }}</span>
            </van-col>
            <van-col span="6">
                <span>{{ item.created }}</span>
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
                recordList: [
                    { id: 1, gold: '+20', origin: '充值', created: '2019-05-17 10:14:20' },
                    { id: 2, gold: '+10', origin: '签到', created: '2019-05-17' },
                    { id: 3, gold: '-20', origin: '发布文章', created: '2019-05-17' }
                ],
                page: {
                    current: 1,
                    size: 10,
                    total: 20
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
                console.log('初始化数据')
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