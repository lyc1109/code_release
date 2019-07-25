<template>
    <el-footer class="index_foot">
        Copyright © 2019 微群发布
<!--        <p v-if="reg.test(navigator.userAgent)" style="margin-top: 2px;">客服QQ：-->
<!--            <a :href="url">{{ qq }}</a>-->
<!--        </p>-->
        <p style="margin-top: 2px;">客服邮箱：<a href="####">{{ email }}</a></p>
    </el-footer>
</template>

<script>
    export default {
        name: "footer",
        data() {
            return {
                qq: '',
                reg: /Android|webOS|iPhone|iPod|iPad|BlackBerry/i,
                navigator: navigator,
                email: ''
                // url: `mqqwpa://im/chat?chat_type=wpa&uin=${this.qq}&version=1&src_type=web&web_src=http:://wpa.b.qq.com`
            }
        },
        computed: {
            url() {
                return `mqqwpa://im/chat?chat_type=wpa&uin=${this.qq}&version=1&src_type=web&web_src=http:://wpa.b.qq.com`
            }
        },
        created() {
            if (this.reg.test(this.navigator.userAgent))
                this.contactService()

            this.getEmail()
        },
        methods: {
            // 联系邮箱
            getEmail() {
                this.$api.getServiceMail().then((res) => {
                    if (res) {
                        this.email = res.mail
                    }
                })
            },
            // 联系客服
            contactService() {
                this.$api.getServiceQQ().then((res) => {
                    if (res) {
                        this.qq = res.qq
                    }
                })
            },
            // 移动端联系客服
            contactQqM() {
                const url = `mqqwpa://im/chat?chat_type=wpa&uin=${this.qq}&version=1&src_type=web&web_src=http:://wpa.b.qq.com`;
                console.log(url)
                window.location.href = url
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