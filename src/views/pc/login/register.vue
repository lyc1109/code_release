<template>
    <div style="padding-right: 20px;">
        <el-form :model="registerForm" ref="register" :rules="registerRule" label-width="100px">
            <el-form-item prop="mail" label="邮箱">
                <el-input v-model="registerForm.mail" placeholder="请输入邮箱" size="small" @change="changeEmail"></el-input>
            </el-form-item>
            <el-form-item prop="code" label="验证码" class="code_form">
                <el-input v-model="registerForm.code" placeholder="请输入验证码" size="small" class="code_input"></el-input>
<!--                <el-button size="mini" style="margin-left: 10px;">-->
                    <img :src="codeUrl" alt="" @click="refreshImg" class="code_img">
<!--                </el-button>-->
            </el-form-item>
            <el-form-item prop="pass" label="密码">
                <el-input v-model="registerForm.pass" type="password" placeholder="请输入密码" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd" label="确认密码">
                <el-input v-model="registerForm.confirmPwd" type="password" placeholder="请确认密码" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="success('register')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            let validPwd = (rule, value, callback) => {
                if (value.length < 6) callback(new Error('密码不能少于6位'))
                else if (value.length > 16) callback(new Error('密码不能大于16位'))
                else if (!value || value === '') callback(new Error('密码不能为空'))
                else callback()
            }
            let confirmPwd = (rule, value, callback) => {
                if (value !== this.registerForm.pass) {
                    callback(new Error('两次输入的密码不一致'))
                } else if (!value) {
                    callback(new Error('请再次输入密码'))
                } else {
                    callback()
                }
            }
            let validCode = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入验证码'))
                } else if (value.length !== 4) {
                    callback(new Error('验证码为4位数字'))
                } else {
                    callback()
                }
            }
            return {
                registerForm: {
                    mail: '',
                    code: '',
                    pass: '',
                    confirmPwd: ''
                },
                registerRule: {
                    mail: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    code: [{required: true, validator: validCode, trigger: 'blur'}],
                    pass: [
                        {required: true, validator: validPwd, trigger: 'blur'}
                    ],
                    confirmPwd: [
                        {required: true, validator: confirmPwd, trigger: 'blur'}
                    ]
                },
                disabled: true,
                codeUrl: `/api/img/verification?${Math.random()}`
            }
        },
        methods: {
            // 改邮箱时
            changeEmail(val) {
                let reg = new RegExp('^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
                if (reg.test(val)) {
                    this.disabled = false
                } else if (!reg.test(val)) {
                    this.disabled = true
                }
            },
            // 注册成功
            success(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.register(this.registerForm)
                            .then((res) => {
                                if (res) {
                                    sessionStorage.setItem('user', JSON.stringify(res.user))
                                    this.$emit('success', true)
                                    this.$emit('close', false)
                                    this.$message.success('注册成功')
                                }
                            })
                    }
                })
            },
            // 刷新图片验证码
            refreshImg() {
                const hash = Math.random()
                this.codeUrl = `/api/img/verification?${hash}`
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .code_input{
        width: 70%;
    }
    .code_form{
        /deep/.el-form-item__content{
            display: flex;

            .code_input{
                flex: 0 0 60%;
            }
        }
    }
    .code_img{
        width: 80px;
        height: 30px;
        margin: 4px 0 0 5px;
        border: 1px solid #ececec;
    }
</style>