<template>
    <div>
        <el-dialog :visible.sync="isShowBox" title="邀请推广" @close="toggle" width="30%">
            <el-form :model="inviteForm" :rules="inviteRule" label-width="100px" ref="invite">
                <el-form-item prop="count" label="推广次数">
                    <el-input v-model="inviteForm.count" placeholder="请输入推广次数" type="number" size="small" min-length="20"></el-input>
                </el-form-item>
                <el-form-item prop="price" label="推广单价">
                    <el-select v-model="inviteForm.price" placeholder="请选择推广单价" size="small">
                        <el-option v-for="(item, index) in priceList" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                    <!--<el-input v-model="inviteForm.price" placeholder="请输入推广单价" type="number" size="small"></el-input>-->
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
                default: 0
            },
            sectionId: {
                type: String,
                default: ''
            }
        },
        data() {
            const validCount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入推广次数'))
                } else if (value < 20) {
                    callback(new Error('推广次数必须大于20'))
                } else {
                    callback()
                }
            }
            return {
                isShowBox: this.isShow,
                inviteForm: {
                    count: 20,
                    price: ''
                },
                inviteRule: {
                    count: [{ required: true, validator: validCount, trigger: 'blur' }],
                    price: [{ required: true, message: '请输入推广单价', trigger: 'change' }]
                },
                priceList: [],
                codesId: this.codeId
            }
        },
        watch: {
            isShow(val) {
                if (val) {
                    this.fetchPrice()
                    this.isShowBox = true
                }else {
                    this.isShowBox = false
                }
            },
            codeId(val) {
                this.codesId = val
            }
        },
        methods: {
            toggle() {
                this.$emit('toggle', false)
            },
            // 获取单价列表
            fetchPrice() {
                this.$api.getPopularizePriceOption({
                    sectionId: this.sectionId
                }).then((res) => {
                    if (res) {
                        this.priceList = res.priceOptions
                    }
                })
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
                                setTimeout(() => {
                                    this.$router.go(0)
                                }, 500)
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