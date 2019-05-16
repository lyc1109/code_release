<template>
    <van-popup v-model="isShowRule" position="right" :overlay="true" @close="toggle" class="gold_rule">
        <div class="rule_top">
            <b>金币规则</b>
            <van-icon name="close" style="float: right;" @click="close"></van-icon>
        </div>
        <p v-html="rule"></p>
    </van-popup>
</template>

<script>
    export default {
        name: "rule",
        props: {
            isShow: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                isShowRule: this.isShow,
                rule: '富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本富文本'
            }
        },
        watch: {
            isShow(val) {
                return val ? this.isShowRule = true : this.isShowRule = false
            }
        },
        methods: {
            toggle() {
                this.$emit('toggle', false)
            },
            close() {
                this.isShowRule = false
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .gold_rule{
        width: 100%;
        height: 100%;

        .rule_top{
            height: 40px;
            /*width: 100%;*/
            border-bottom: 1px solid #e2e2e2;
            background: #eee;
            line-height: 40px;
            padding: 0 1rem;

            b{
                font-size: 1.8rem;
            }
            .van-icon{
                font-size: 2rem;
                color: #a7a7a7;
                position: relative;
                top: 10px;
            }
        }
        p{
            padding: 1rem;
            font-size: 1.4rem;
            line-height: 25px;
        }
    }
</style>