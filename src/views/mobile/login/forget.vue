<template>
        <div class="login_bg">
            <div class="search_img">
                <span>微群发布</span>
                <!--<img src="" alt="">-->
            </div>
            <!--第一步-->
            <van-cell-group v-if="isOnStep">
                <van-field
                        v-model="forgetForm.mail"
                        clearable
                        left-icon="manager"
                        type="email"
                        placeholder="邮箱"
                        :error-message="emailError"
                        @input="changeEmail(forgetForm.mail)"></van-field>
                <van-field v-model="forgetForm.code"
                           clearable placeholder="验证码"
                           :error-message="codeError"
                           left-icon="youzan-shield"
                           @input="changeCode(forgetForm.code)">
                    <img :src="codeUrl" slot="button" @click="refreshImg" class="code_img">
                </van-field>
                <van-button type="info" @click="nextStep" style="width: 100%;margin-top: 4rem;">确定</van-button>
            </van-cell-group>
            <!--第二步-->
            <van-cell-group v-else>
                <van-field
                        v-model="forgetForm2.mail"
                        clearable
                        left-icon="manager"
                        type="email"
                        placeholder="邮箱"
                        :error-message="mailError"
                        @input="changeMail(forgetForm2.mail)"></van-field>
                <van-field v-model="forgetForm2.code"
                           clearable placeholder="验证码"
                           :error-message="mailCodeError"
                           left-icon="youzan-shield"
                           @input="changeMailCode(forgetForm2.code)">
                    <img :src="codeUrl" slot="button" @click="refreshImg" class="code_img">
                </van-field>
                <van-field
                        v-model="forgetForm2.pass"
                        type="password"
                        placeholder="密码"
                        left-icon="lock"
                        :error-message="passError"
                        @input="changePwd(forgetForm2.pass)"></van-field>
                <van-field
                        v-model="forgetForm2.confirmPwd"
                        type="password"
                        placeholder="确认密码"
                        left-icon="checked"
                        :error-message="confirmPassError"
                        @input="changeConfirmPwd(forgetForm2.confirmPwd)"></van-field>
                <van-button type="info" @click="success" style="width: 100%;margin-top: 4rem;">确定</van-button>
            </van-cell-group>
        </div>
</template>

<script>
    import bg from '@/assets/images/login.jpg'
    import { Toast } from 'vant'

    export default {
        name: "forget",
        data() {
            return {
                codeUrl: `${process.env.VUE_APP_BASE_API}/img/verification?${Math.random()}`,
                emailError: '',
                mailError: '',
                codeError: '',
                mailCodeError: '',
                passError: '',
                confirmPassError: '',
                forgetForm: {
                    mail: '',
                    code: '',
                },
                forgetForm2: {
                    mail: '',
                    code: '',
                    pass: ''
                },
                isOnStep: true
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
            // 验证邮箱
            changeEmail(val) {
                const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                if (!reg.test(val)) {
                    this.emailError = '请输入正确的邮箱'
                } else {
                    this.emailError = ''
                }
            },
            // 验证邮箱
            changeMail(val) {
                const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                if (!reg.test(val)) {
                    this.mailError = '请输入正确的邮箱'
                } else {
                    this.mailError = ''
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
            changeMailCode(val) {
                if (val.length !== 4) {
                    this.mailCodeError = '验证码格式错误'
                } else {
                    this.mailCodeError = ''
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
                if (val !== this.forgetForm2.pass) {
                    this.confirmPassError = '两次输入的密码不一致'
                } else {
                    this.confirmPassError = ''
                }
            },
            // 下一步
            nextStep() {
                if (this.emailError === '' && this.codeError === '') {
                    this.$api.resetPass(this.forgetForm)
                        .then((res) => {
                            if (res) {
                                Toast.success('邮件已发送到邮箱，请查收')
                                setTimeout(() => {
                                    this.isOnStep = false
                                },2000)
                            }
                        })
                } else {
                    if (this.forgetForm.mail === '') this.mailError = '请输入邮箱'
                    if (this.forgetForm.code === '') this.codeError = '请输入验证码'
                }
            },
            // 修改成功
            success() {
                if (this.mailError === '' && this.passError === '' && this.confirmPassError === '') {
                    this.$api.changePassByMail(this.forgetForm2)
                        .then((res) => {
                            if (res) {
                                Toast.success('修改成功')
                                this.$router.push('/login')
                            }
                        })
                } else {
                    if (this.forgetForm2.mail === '') this.emailError = '请输入邮箱'
                    if (this.forgetForm2.code === '') this.mailCodeError = '请输入验证码'
                    if (this.forgetForm2.pass === '') this.passError = '请输入密码'
                    if (this.forgetForm2.confirmPwd === '') this.confirmPassError = '请输入确认密码'
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