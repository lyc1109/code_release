<template>
    <div>
        <el-table :data="recordData" border>
            <el-table-column v-for="(item, index) in recordList"
                             :key="index"
                             :prop="item.prop"
                             :label="item.label"></el-table-column>
        </el-table>
        <el-pagination :current-page="page.current"
                       :page-size="page.size"
                       :total="page.total"
                       layout="total, prev, pager, next"
                       @current-change="changeCurrent"
                       @size-change="changeSize" style="text-align: right;margin-top: 10px;"></el-pagination>
    </div>
</template>

<script>
    export default {
        name: "record",
        data() {
            return {
                recordData: [
                    { id: '1', gold: 200, origin: '充值', created: '2019-05-11 13:47:59' },
                    { id: '2', gold: 200, origin: '签到', created: '2019-05-11 13:47:59' },
                    { id: '3', gold: 200, origin: '发布文章', created: '2019-05-11 13:47:59' }
                ],
                recordList: [
                    {
                        prop: 'id',
                        label: '消费ID'
                    },
                    {
                        prop: 'gold',
                        label: '金币数'
                    },
                    {
                        prop: 'origin',
                        label: '来源'
                    },
                    {
                        prop: 'created',
                        label: '时间'
                    }
                ],
                page: {
                    current: 1,
                    size: 5,
                    total: 10,
                }
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
             // 跳转到某一页
            changeCurrent(val) {
                this.page.current = val
                this.fetchData()
            },
            // 一页显示几条
            changeSize(val) {
                this.page.size = val
                this.fetchData()
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
</style>