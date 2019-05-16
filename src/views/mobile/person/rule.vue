<template>
    <van-popup v-model="isShowRule" position="right" :overlay="true" @close="toggle">
        <h2>金币规则</h2>
        <p v-html="rule"></p>
    </van-popup>
</template>

<script>
    export default {
        name: "rule",
        props: {
            isShow: {
                type: Boolean,
                default: false
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
            }
        }
    }
</script>

<style scoped>

</style>