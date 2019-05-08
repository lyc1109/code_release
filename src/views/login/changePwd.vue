<template>
    <div style="padding-right: 20px;">
        <el-form :model="changePwdForm" ref="changePwd" :rules="changePwdRule" label-width="100px">
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="changePwdForm.email" placeholder="请输入邮箱" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="code" label="验证码" class="code_form">
                <el-input v-model="changePwdForm.code" placeholder="请输入验证码" size="small" class="code_input" type="number"></el-input>
                <el-button size="mini" style="margin-left: 10px;">
                    <img src="https://weixinqun.com/validatecode?0.4172283221113815" alt="">
                </el-button>
            </el-form-item>
            <el-form-item prop="pwd" label="更换密码">
                <el-input v-model="changePwdForm.pwd" type="password" placeholder="请输入密码" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd" label="确认密码">
                <el-input v-model="changePwdForm.confirmPwd" type="password" placeholder="请确认密码" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="success('changePwd')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "changePwd",
        data() {
            let validPwd = (rule, value, callback) => {
                if (value.length < 6) callback(new Error('密码不能少于6位'))
                else if (value.length > 16) callback(new Error('密码不能大于16位'))
                else if (!value || value === '') callback(new Error('密码不能为空'))
                else callback()
            }
            let confirmPwd = (rule, value, callback) => {
                if (value !== this.changePwdForm.pwd) {
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
                changePwdForm: {
                    email: '',
                    code: '',
                    pwd: '',
                    confirmPwd: ''
                },
                changePwdRule: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    code: [{required: true, validator: validCode, trigger: 'blur'}],
                    pwd: [
                        {required: true, validator: validPwd, trigger: 'blur'}
                    ],
                    confirmPwd: [
                        {required: true, validator: confirmPwd, trigger: 'blur'}
                    ]
                },
                disabled: true
            }
        },
        methods: {
            success(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('close', false)
                        this.$message.success('密码修改成功')
                    }
                })
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
                flex: 0 0 76%;
            }
        }
    }
</style>