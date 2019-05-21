<template>
    <div>
        <el-dialog :visible.sync="isShowBox" title="邀请推广" @close="toggle" width="30%">
            <el-form :model="inviteForm" :rules="inviteRule" label-width="100px" ref="invite">
                <el-form-item prop="count" label="推广次数">
                    <el-input v-model="inviteForm.count" placeholder="请输入推广次数" type="number" size="small"></el-input>
                </el-form-item>
                <el-form-item prop="price" label="推广单价">
                    <el-input v-model="inviteForm.price" placeholder="请输入推广单价" type="number" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" @click="success('invite')">确定</el-button>
                <el-button size="small" @click="cancel('invite')">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "invite",
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            codeId: {
                type: Number,
                default: ''
            }
        },
        data() {
            return {
                isShowBox: this.isShow,
                inviteForm: {
                    count: 0,
                    price: 0
                },
                inviteRule: {
                    count: [{ required: true, message: '请输入推广次数', trigger: 'blur' }],
                    price: [{ required: true, message: '请输入推广单价', trigger: 'blur' }]
                }
            }
        },
        watch: {
            isShow(val) {
                return val ? this.isShowBox = true : this.isShowBox = false
            }
        },
        methods: {
            toggle() {
                this.$emit('toggle', false)
            },
            success(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.invitePopularize({
                            codeId: this.codeId,
                            count: this.inviteForm.count,
                            price: this.inviteForm.price
                        }).then((res) => {
                            if (res) {
                                this.$message.success('保存成功')
                                this.isShowBox = false
                            }
                        })
                    }
                })
            },
            // 取消
            cancel(formName) {
                this.isShowBox = false
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style scoped>

</style>