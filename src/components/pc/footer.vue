<template>
    <el-footer class="index_foot">
        Copyright © 2019 微群发布
        <p v-if="reg.test(navigator.userAgent)">投放广告QQ：{{ qq }}</p>
    </el-footer>
</template>

<script>
    export default {
        name: "footer",
        data() {
            return {
                qq: '',
                reg: /Android|webOS|iPhone|iPod|iPad|BlackBerry/i,
                navigator: navigator
            }
        },
        created() {
            if (this.reg.test(this.navigator.userAgent))
                this.contactService()
        },
        methods: {
            // 联系客服
            contactService() {
                this.$api.getServiceQQ().then((res) => {
                    if (res) {
                        this.qq = res.qq
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .index_foot {
        border-top: 1px solid #ddd;
        padding: 20px 0;
        text-align: center;
        font-size: 14px;
        color: #555;
        margin-top: 30px;
    }
</style>