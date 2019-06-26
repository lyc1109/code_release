<template>
    <div>
        <el-form :model="recharge" ref="recharge" :rules="rechargeRule" label-width="100px">
            <el-form-item prop="count" label="金额">
<!--                <el-select v-model="recharge.count" placeholder="请选择充值金额">-->
<!--                    <el-option v-for="(item, index) in countList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--                </el-select>-->
                <el-radio-group v-model="recharge.rechargeSelectId" @change="changeCount" size="mini">
                    <el-radio v-for="(item, index) in countList" :key="index" :label="item.id">{{ item.money }}元</el-radio>
                </el-radio-group>
                <div class="recharge_code">
                    <img :src="codeUrl" alt="">
                </div>
            </el-form-item>
            <el-form-item prop="url" label="支付成功截图">
                <el-upload :action="fileUploadUrl"
                           :on-success="changeUrl"
                           class="avatar-uploader"
                           :show-file-list="false">
                    <img v-if="recharge.url && recharge.url !== ''" :src="recharge.url"
                         class="avatar">
                    <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                </el-upload>
            </el-form-item>
            <el-form-item prop="rules" label="充值说明">
                <span>{{ rules }}</span>
            </el-form-item>
            <el-form-item prop="gold" label="您将入账金币">
                <span><b style="color: red;">{{ gold }}</b>金币</span>
            </el-form-item>
            <el-form-item prop="serial" label="转账流水号">
                <el-input v-model="recharge.serial" placeholder="请输入转账流水号" size="mini"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;">
                <el-button type="primary" size="mini" @click="toRecharge('recharge')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "recharge",
        data() {
            return {
                recharge: {
                    rechargeSelectId: 10,
                    url: '',
                    serial: ''
                },
                rechargeRule: {
                    rechargeSelectId: [{ required: true, message: '请输入充值金额', trigger: 'blur' }],
                    serial: [{ required: true, message: '请输入转账流水号', trigger: 'blur' }]
                },
                countList: [],
                gold: 0,
                rules: '',
                fileUploadUrl: process.env.VUE_APP_BASE_API + '/file/add',
                codeUrl: ''
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            // 初始化数据
            fetchData() {
                this.$api.getRechargeSetting().then((res) => {
                    if (res) {
                        this.codeUrl = res.rechargeQRCodeUrl
                        this.countList = res.rechargeSelect
                        this.recharge.rechargeSelectId = this.countList[0].id
                        this.gold = this.countList[0].coin
                        this.rules = res.msg
                    }
                })
            },
            // 修改金额
            changeCount(val) {
                let obj = this.countList.filter((data) => {
                    return data.id === val
                })
                this.gold = obj[0].coin
            },
            // 确定充值
            toRecharge(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.addPayment(this.recharge).then((res) => {
                            if (res) {
                                this.$message.success('充值成功')
                                setTimeout(() => {
                                    this.$router.push('/person')
                                }, 500)
                            }
                        })
                    }
                })
            },
            changeUrl(res) {
                this.recharge.url = res.data.url
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .recharge_code{
        width: 100%;
        margin-top: 10px;

        img{
            width: 120px;
        }
    }
    .avatar-uploader {
        /deep/.el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        /deep/.el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>