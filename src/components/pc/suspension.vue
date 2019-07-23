<template>
    <div>
    <!--右侧悬浮-->
    <div class="right_box"  v-if="!reg.test(navigator.userAgent)">
<!--        <el-link :underline="false" @click="contactQq">联 系<br>客 服</el-link>-->
        <el-link :underline="false" v-popover:popover>手 机 端<br>入 口</el-link>
        <el-link :underline="false" @click="register">有 奖<br>注 册</el-link>

        <el-popover placement="left" width="200" trigger="hover" ref="popover">
            <img :src="mobileImg" alt="">
        </el-popover>
    </div>

        <div class="bottom_box" v-else>
            <el-link :underline="false" v-popover:popover>手机端入口</el-link>

            <el-popover placement="left" width="200" trigger="click" ref="popover">
                <img :src="mobileImg" alt="">
            </el-popover>
        </div>
        <login-box  :is-show="showLogin"
                    @toggle="toggleLogin"
                    :type="loginType"
                    :title="loginTit"
                    @success="successRegister"></login-box>
    </div>
</template>

<script>
    import loginBox from '@/views/pc/login/login'
    // import mobileImg from '@/assets/images/mobile.jpg'

    export default {
        name: "suspension",
        data() {
            return {
                showLogin: false,
                loginType: '',
                loginTit: '',
                mobileImg: '',
                reg: /Android|webOS|iPhone|iPod|iPad|BlackBerry/i,
                navigator: navigator
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.$api.getMobileQRCode().then((res) => {
                    if (res) {
                        this.mobileImg = res.qrcode
                    }
                })
            },
            // 控制登录显示隐藏
            toggleLogin(val) {
                return val ? this.showLogin = true : this.showLogin = false
            },
            // 注册
            register() {
                if (!this.reg.test(this.navigator.userAgent)) {
                    this.loginTit = '注册'
                    this.loginType = 'register'
                    this.showLogin = true
                } else {
                    this.$router.push('/register')
                }
            },
            // 登录成功
            successRegister(val) {
                setTimeout(() => {
                    this.$router.go(0)
                }, 1000)
                this.showLogin = false
            },
            // 联系客服
            contactQq() {
                this.$api.getServiceQQ().then((res) => {
                    if (res) {
                        window.location.href = `tencent://message/?uin=${res.qq}&Site=&Menu=yes`
                    }
                })
            }
        },
        components: {
            loginBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .right_box {
        position: fixed;
        width: 60px;
        right: 20px;
        bottom: 100px;
        z-index: 49;

        .el-link {
            width: 100%;
            color: #1479d7;
            font-size: 14px;
            display: inline-block;
            background: #F5F8FC;
            border: 1px solid #C9DFF4;
            margin-bottom: 20px;
            text-align: center;
            line-height: 20px;
            padding-top: 10px;
            height: 50px;

            &+.el-link{
                margin-left: 0;
            }
            span{
                position: relative;
                top: -5px;
            }
        }
    }
    .right_box_mobile{
        right: 0;
    }
    .bottom_box{
        position: fixed;
        bottom: 50px;
        right: 10px;
        background: #4baf4b;
        color: #fff;
        padding: 10px;
        border-radius: 4px;

        .el-link.el-link--default{
            color: #fff;
        }
    }
</style>