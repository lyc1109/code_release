<template>
    <div>
        <h2 style="text-align: center;margin-bottom: 20px;">金币规则</h2>
        <p style="line-height: 25px;">{{ goldRule }}</p>
    </div>
</template>

<script>
    export default {
        name: "rule",
        data() {
            return {
                goldRule: '富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本'
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            // 初始化数据
            fetchData() {
                this.$api.getRechargeSetting().then((res) => {
                    if (res) {
                        this.goldRule = res.msg
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
</style>