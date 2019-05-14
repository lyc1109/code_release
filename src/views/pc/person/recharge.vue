<template>
    <div class="home">
        <el-form :model="recharge" ref="recharge" :rules="rechargeRule" label-width="100px">
            <el-form-item prop="amount" label="金额">
<!--                <el-select v-model="recharge.amount" placeholder="请选择充值金额">-->
<!--                    <el-option v-for="(item, index) in amountList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--                </el-select>-->
                <el-radio-group v-model="recharge.amount" @change="changeAmount" size="mini">
                    <el-radio v-for="(item, index) in amountList" :key="index" :label="item.id">{{ item.name }}</el-radio>
                </el-radio-group>
                <div class="recharge_code">
                    <img :src="recharge.code" alt="">
                </div>
            </el-form-item>
            <el-form-item prop="gold" label="您将入账金币">
                <span><b style="color: red;">{{ recharge.gold }}</b>金币</span>
            </el-form-item>
            <el-form-item prop="num" label="转账流水号">
                <el-input v-model="recharge.num" placeholder="请输入转账流水号" size="mini"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;">
                <el-button type="primary" size="mini">确定</el-button>
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
                    amount: 10,
                    code: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                    gold: 200,
                    num: ''
                },
                rechargeRule: {},
                amountList: [
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
            changeAmount(val) {
                console.log(val)
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