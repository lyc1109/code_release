<template>
    <div class="login_bg">
        <div class="search_img">
            <span>微群发布</span>
            <!--<img src="" alt="">-->
        </div>
        <van-cell-group>
            <van-field
                    v-model="registerForm.mail"
                    clearable
                    left-icon="manager"
                    type="email"
                    placeholder="邮箱"
                    :error-message="emailError"
                    @input="changeEmail(registerForm.mail)"></van-field>
            <van-field v-model="registerForm.code"
                       clearable placeholder="验证码"
                       :error-message="codeError"
                       left-icon="youzan-shield"
                       @input="changeCode(registerForm.code)">
                <img :src="codeUrl" slot="button" @click="refreshImg" class="code_img">
            </van-field>

            <van-field
                    v-model="registerForm.pass"
                    type="password"
                    placeholder="密码"
                    left-icon="lock"
                    :error-message="passError"
                    @input="changePwd(registerForm.pass)"></van-field>
            <van-field
                    v-model="registerForm.confirmPwd"
                    type="password"
                    placeholder="确认密码"
                    left-icon="checked"
                    :error-message="confirmPassError"
                    @input="changeConfirmPwd(registerForm.confirmPwd)"></van-field>
        </van-cell-group>
        <van-button type="info" @click="success" style="width: 100%;margin-top: 4rem;">注册</van-button>
    </div>
</template>

<script>
    import bg from '@/assets/images/login.jpg'
    import { Toast } from 'vant'

    export default {
        name: "register",
        data() {
            return {
                emailError: '',
                codeError: '',
                passError: '',
                confirmPassError: '',
                codeUrl: `${process.env.VUE_APP_BASE_API}/img/verification?${Math.random()}`,
                registerForm: {
                    mail: '',
                    code: '',
                    pass: '',
                    confirmPwd: ''
                },
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
            // 刷新图片验证码
            refreshImg() {
                const hash = Math.random()
                this.codeUrl = `${process.env.VUE_APP_BASE_API}/img/verification?${hash}`
            },
            // 注册成功
            success() {
                if (this.emailError !== '' && this.codeError !== '' && this.passError !== '' && this.confirmPassError !== '') {
                    this.$api.register(this.registerForm)
                        .then((res) => {
                            if (res) {
                                sessionStorage.setItem('user', JSON.stringify(res.user))
                                Toast.success('注册成功')
                                this.$router.push('/')
                            }
                        })
                } else {
                    if (this.registerForm.mail === '') this.emailError = '请输入邮箱'
                    if (this.registerForm.code === '') this.codeError = '请输入验证码'
                    if (this.registerForm.pass === '') this.passError = '请输入密码'
                    if (this.registerForm.confirmPwd === '') this.confirmPassError = '请输入确认密码'
                }
            },
            // 验证邮箱
            changeEmail(val) {
                const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                if (!reg.test(val)) {
                    this.emailError = '请输入正确的邮箱'
                } else {
                    this.emailError = ''
                }
            },
            // 验证验证码
            changeCode(val) {
                if (val.length !== 4) {
                    this.codeError = '验证码格式错误'
                } else {
                    this.codeError = ''
                }
            },
            // 验证密码
            changePwd(val) {
                if (val.length === 0) {
                    this.passError = '请输入密码'
                } else {
                    this.passError = ''
                }
            },
            // 验证确认密码
            changeConfirmPwd(val) {
                if (val !== this.registerForm.pass) {
                    this.confirmPassError = '两次输入的密码不一致'
                } else {
                    this.confirmPassError = ''
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
    .code_img{
        width: 6rem;
    }
    /deep/.van-icon-youzan-shield{
        top: 6px;
    }
</style>