<template>
    <div>
        <van-cell-group>
            <van-field v-model="rechargeForm.amount"
                       required
                       type="number"
                       label="充值金额"
                       placeholder="请输入充值金额"
                       :error-message="amountError" @input="changeAmount(rechargeForm.amount)"></van-field>
            <van-cell title="您将入账金币" :value="gold"></van-cell>
            <van-field v-model="rechargeForm.num"
                       required
                       label="转账流水号"
                       placeholder="请输入转账流水号"
                       :error-message="numError" @input="changeNum(rechargeForm.num)"></van-field>
            <div style="padding: 2rem;">
                <van-button type="info" size="large" @click="success">充值</van-button>
            </div>
        </van-cell-group>
    </div>
</template>

<script>
    import {Toast} from 'vant'

    export default {
        name: "recharge",
        data() {
            return {
                gold: 0,
                rechargeForm: {
                    amount: '',
                    num: ''
                },
                amountError: '',
                numError: ''
            }
        },
        methods: {
            // 充值金额验证
            changeAmount(val) {
                if (val.length === 0) {
                    this.amountError = '请输入充值金额'
                } else if (val == 0) {
                    this.amountError = '请输入大于0的金额'
                } else {
                    this.amountError = ''
                }
            },
            // 流水号验证
            changeNum(val) {
                if (val.length === 0) {
                    this.numError = '请输入转账流水号'
                } else {
                    this.numError = ''
                }
            },
            // 充值
            success() {
                if (this.rechargeForm.amount.length > 0 && this.rechargeForm.num.length > 0) {
                    Toast.success('充值成功')
                    setTimeout(() => {
                        this.$router.push('/person')
                    }, 500)
                } else {
                    if (this.rechargeForm.amount.length === 0) this.amountError = '请输入充值金额'
                    if (this.rechargeForm.amount == 0) this.amountError = '请输入大于0的金额'
                    if (this.rechargeForm.num.length === 0) this.numError = '请输入转账流水号'
                }
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
</style>