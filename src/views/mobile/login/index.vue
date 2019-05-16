<template>
    <div class="login_bg">
        <div class="search_img">
            <span>微群发布</span>
            <!--<img src="" alt="">-->
        </div>
        <van-cell-group>
            <van-field
                    v-model="loginForm.principal"
                    clearable
                    left-icon="manager"
                    type="email"
                    placeholder="邮箱" :error-message="emailError"></van-field>

            <van-field
                    v-model="loginForm.pass"
                    type="password"
                    placeholder="密码"
                    left-icon="lock"></van-field>
        </van-cell-group>
        <div style="margin-top: 1rem;">
            没有账号？点击 <router-link to="/register" style="color: #fff;">注册</router-link>
            <router-link to="/forget" style="float: right;color: #fff;">忘记密码？</router-link>
        </div>
        <van-button type="info" @click="success" style="width: 100%;margin-top: 4rem;">登录</van-button>
    </div>
</template>

<script>
    import bg from '@/assets/images/login.jpg'

    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    principal: '',
                    pass: ''
                },
                emailError: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                document.body.style.background = `url(${bg}) no-repeat`
                document.body.style.backgroundSize =  'cover'
            })
        },
        beforeDestroy() {
            document.body.style.background = `#fff`
        },
        methods: {
            // 确定
            success() {
                const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                if (!reg.test(this.loginForm.principal)) {
                    this.emailError = '请输入正确的邮箱'
                } else {
                    this.emailError = ''
                        this.$api.login(this.loginForm)
                        .then((res) => {
                            if (res) {
                                sessionStorage.setItem('user', JSON.stringify(res.user))
                                this.$message.success('登录成功')
                                this.$router.push('/')
                            }
                        })
                }
            },
            // 注册
            toRegister() {
                this.$router.push('/register')
            },
            // 忘记密码
            forgetPwd() {
                this.$router.push('/forget')
            },
            changeEmail(val) {
                const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                if (!reg.test(val)) {
                    this.emailError = '请输入正确的邮箱'
                }
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .login_bg{
        padding: 40% 5%;

        /deep/.van-cell-group{
            background: none;

            &:after{
                border: 0 none;
            }

            .van-cell{
                background: none;
                border-bottom: 1px solid rgba(#ebedf0, .5);

                &:after{
                    border: 0 none;
                }
                /deep/.van-field__control{
                    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                        color: #fff;
                        padding-left: .5rem;
                    }
                }
                .van-field__left-icon{
                    .van-icon{
                        color: #fff;
                    }
                }
            }
        }
    }
    .search_img {
        text-align: center;
        margin: 3% 0;

        span {
            font-size: 2.4rem;
            font-weight: normal;
            color: #fff;
        }
    }
</style>