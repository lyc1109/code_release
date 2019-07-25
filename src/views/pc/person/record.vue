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
                recordData: [],
                recordList: [
                    {
                        prop: 'id',
                        label: '消费ID'
                    },
                    {
                        prop: 'cost',
                        label: '金币数'
                    },
                    {
                        prop: 'origin',
                        label: '来源'
                    },
                    {
                        prop: 'modifyTime',
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
                this.$api.getBillDetail({
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.recordData = res.info.list
                        this.recordData.forEach((value, index, array) => {
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
                                case 8:
                                    array[index].origin = '推广金币返还'
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