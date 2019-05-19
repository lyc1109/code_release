<template>
    <div class="home">
        <el-form :model="recharge" ref="recharge" :rules="rechargeRule" label-width="100px">
            <el-form-item prop="count" label="金额">
<!--                <el-select v-model="recharge.count" placeholder="请选择充值金额">-->
<!--                    <el-option v-for="(item, index) in countList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--                </el-select>-->
                <el-radio-group v-model="recharge.count" @change="changeCount" size="mini">
                    <el-radio v-for="(item, index) in countList" :key="index" :label="item.id">{{ item.name }}</el-radio>
                </el-radio-group>
                <div class="recharge_code">
                    <img :src="recharge.url" alt="">
                </div>
            </el-form-item>
            <el-form-item prop="gold" label="您将入账金币">
                <span><b style="color: red;">{{ recharge.gold }}</b>金币</span>
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
                    count: 10,
                    url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                    gold: 200,
                    serial: ''
                },
                rechargeRule: {
                    count: [{ required: true, message: '请输入充值金额', trigger: 'blur' }],
                    serial: [{ required: true, message: '请输入转账流水号', trigger: 'blur' }]
                },
                countList: [
                    { name: '10元', id: 10 },
                    { name: '50元', id: 50 },
                    { name: '100元', id: 100 }
                ]
            }
        },
        methods: {
            // 初始化数据
            fetchData() {
                console.log('初始化数据')
            },
            // 修改金额
            changeCount(val) {
                console.log(val)
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
</style>