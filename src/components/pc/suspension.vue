<template>
    <div>
    <!--右侧悬浮-->
    <div class="right_box" :class="{ right_box_mobile: reg.test(navigator.userAgent) }">
        <el-link :underline="false" @click="contactService">联 系<br>客 服</el-link>
        <el-link :underline="false" v-popover:popover v-if="!reg.test(navigator.userAgent)">手 机 端<br>入 口</el-link>
        <el-link :underline="false" @click="register">有 奖<br>注 册</el-link>

        <el-popover placement="left" width="200" trigger="hover" ref="popover">
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

    export default {
        name: "suspension",
        data() {
            return {
                showLogin: false,
                loginType: '',
                loginTit: '',
                mobileImg: 'https://img8.souweixin.com/20190504/1309613/fc9d6cfdbf6c38769d320924235572a7.jpeg',
                reg: /Android|webOS|iPhone|iPod|iPad|BlackBerry/i,
                navigator: navigator
            }
        },
        methods: {
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
            contactService() {
                console.log('联系客服')
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
</style>