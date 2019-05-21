<template>
    <div>
        <el-dialog :visible.sync="login" :title="title" @close="toggle" width="30%">
            <div v-if="showType === 'login'">
<!--                <div class="other_login">-->
<!--                    <div class="wx_btn">-->
<!--                        <el-button type="success" @click="wxLogin" class="login_btns"><i-->
<!--                                class="iconweixin iconfont"></i>微信登录-->
<!--                        </el-button>-->
<!--                    </div>-->
<!--                    <div class="qq_btn">-->
<!--                        <el-button type="primary" @click="qqLogin" class="login_btns"><i class="iconicon iconfont"></i>QQ登录-->
<!--                        </el-button>-->
<!--                    </div>-->
<!--                </div>-->
                <el-form :model="loginForm" ref="loginForm" :rules="loginRule" label-width="70px">
                    <el-form-item prop="principal" label="邮箱">
                        <el-input v-model="loginForm.principal" placeholder="请输入邮箱" size="small"></el-input>
                    </el-form-item>
                    <el-form-item prop="pass" label="密码">
                        <el-input v-model="loginForm.pass" placeholder="请输入密码" size="small" type="password"></el-input>
                    </el-form-item>
                    <el-form-item prop="forgetPwd" class="text-right">
                        <el-button type="text" size="small" @click="forgetPwd">忘记密码？</el-button>
                    </el-form-item>
                    <el-form-item prop="loginBtn">
                        <el-button type="primary" @click="success('loginForm')" class="login_btns">登录</el-button>
                    </el-form-item>
                    <el-form-item prop="register" class="text-right">
                        <span>没有账号？点击</span>
                        <el-button type="text" size="small" @click="toRegister">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <register-box v-if="showType === 'register'" @close="hide" @success="successReg"></register-box>
            <forgetPwd-box v-if="showType === 'forget'" @close="hide"></forgetPwd-box>
        </el-dialog>
    </div>
</template>

<script>
    import registerBox from '@/views/pc/login/register'
    import forgetPwdBox from '@/views/pc/login/changePwd'

    export default {
        name: "login",
        props: {
            isShow: {
                type: Boolean,
                default: false,
                required: true
            },
            type: {
                type: String,
                default: 'login'
            },
            title: {
                type: String,
                default: '登录'
            },
        },
        data() {
            let validPwd = (rule, value, callback) => {
                if (value.length < 6) callback(new Error('密码不能少于6位'))
                else if (value.length > 16) callback(new Error('密码不能大于16位'))
                else if (!value || value === '') callback(new Error('密码不能为空'))
                else callback()
            }
            return {
                login: this.isShow,
                loginForm: {
                    principal: '',
                    pass: ''
                },
                loginRule: {
                    principal: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
                    pass: [{required: true, validator: validPwd, trigger: 'blur'}]
                },
                showType: this.type
            }
        },
        watch: {
            isShow(val) {
                // if (this.showType === 'login') this.title = '登录'
                // else if (this.showType === 'register') this.title = '注册'

                return val ? this.login = true : this.login = false
            },
            type(val) {
                this.showType = val
                // if (this.showType === 'login') this.title = '登录'
                // else if (this.showType === 'register') this.title = '注册'
            }
        },
        methods: {
            // 控制开关
            toggle() {
                this.$emit('toggle', false)
            },
            // 取消
            hide(val) {
                console.log(val)
                this.toggle()
                this.$emit('success', val)
            },
            // 确定
            success(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loginForm['rememberMe'] = true
                        this.$api.login(this.loginForm)
                            .then((res) => {
                                if (res) {
                                    sessionStorage.setItem('user', JSON.stringify(res.user))
                                    this.$message.success('登录成功')
                                    this.toggle()
                                    this.$emit('success', true)
                                }
                            })
                    }
                })
            },
            // 微信登录
            // wxLogin() {
            //     console.log('微信登录')
            // },
            // // QQ登录
            // qqLogin() {
            //     console.log('QQ登录')
            // },
            toRegister() {
                this.showType = 'register'
                this.title = '注册'
            },
            forgetPwd() {
                this.showType = 'forget'
                this.title = '忘记密码'
            },
            successReg(val) {
                this.$emit('success', val)
            }
        },
        components: {
            registerBox,
            forgetPwdBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .login_btns {
        width: 100%;
    }

    .other_login {
        flex: 1;
        border-right: 1px solid #eee;
        box-sizing: border-box;
        text-align: center;
        padding-right: 20px;
        padding-top: 50px;

        .wx_btn, .qq_btn {
            width: 100%;

            i {
                margin-right: 5px;
            }
        }

        .qq_btn {
            margin-top: 20px;
        }
    }

    .el-form {
        flex: 1.5;
        padding-right: 20px;

        .el-form-item {
            margin-bottom: 10px;
        }

        /deep/ .el-form-item__error {
            padding-top: 0;
        }
    }
</style>