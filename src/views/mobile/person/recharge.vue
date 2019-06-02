<template>
    <div>
        <van-cell-group>
<!--            <van-field v-model="rechargeForm.count"-->
<!--                       required-->
<!--                       type="number"-->
<!--                       label="充值金额"-->
<!--                       placeholder="请输入充值金额"-->
<!--                       :error-message="amountError" @input="changeAmount(rechargeForm.count)"></van-field>-->
            <van-cell required is-link :value="rechargeForm.money" @click="count = true" title="充值金额"></van-cell>
            <van-cell title="付款二维码">
                <img :src="codeUrl" style="width: 10rem;" alt="">
            </van-cell>
            <van-cell title="完成支付截图">
                <div slot="label">
                    <van-uploader :after-read="changeUrl" style="display: inline-block;" :max-size="maxSize">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="rechargeForm.url" alt="" v-if="rechargeForm.url" class="upload_avatar">
                </div>
            </van-cell>
            <van-cell title="金币规则" :value="rules"></van-cell>
            <van-cell title="您将入账金币" :value="gold"></van-cell>
            <van-field v-model="rechargeForm.serial"
                       required
                       label="转账流水号"
                       placeholder="请输入转账流水号"
                       :error-message="numError" @input="changeNum(rechargeForm.serial)"></van-field>
            <div style="padding: 2rem;">
                <van-button type="info" size="large" @click="success">充值</van-button>
            </div>
        </van-cell-group>

        <van-popup v-model="count" position="bottom">
            <van-picker :columns="countList" @confirm="changeCount" @cancel="cancelCount" show-toolbar ref="count"></van-picker>
        </van-popup>
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
                    money: '',
                    serial: '',
                    url: ''
                },
                amountError: '',
                numError: '',
                rules: '',
                count: false,
                countList: [],
                countData: [],
                codeUrl: ''
            }
        },
        computed: {
            maxSize() {
                return 1024 * 1024 * 5
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
                        console.log(this.countList)
                        res.rechargeSelect.forEach((value) => {
                            this.countList.push(value.money)
                        })
                        this.rechargeForm.money = res.rechargeSelect[0].money
                        this.gold = res.rechargeSelect[0].coin
                        this.rules = res.msg
                    }
                })
            },
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
                if (this.rechargeForm.serial.length > 0 && this.rechargeForm.url !== '') {
                    this.$api.addPayment(this.rechargeForm).then((res) => {
                        if (res) {
                            Toast.success('充值成功')
                            setTimeout(() => {
                                this.$router.push('/person')
                            }, 500)
                        }
                    })
                } else {
                    // if (this.rechargeForm.money.length === 0) this.amountError = '请输入充值金额'
                    // if (this.rechargeForm.money == 0) this.amountError = '请输入大于0的金额'
                    if (this.rechargeForm.serial.length === 0) this.numError = '请输入转账流水号'
                    if (this.rechargeForm.url === '') Toast.fail('请上传支付截图')
                    if (this.rechargeForm.money === '') Toast.fail('请选择充值金额')
                }
            },
            changeCount(val) {
                this.count = false
                let obj = this.countData.filter((data) => {
                    return data.money === val
                })
                this.gold = obj[0].coin
                this.rechargeForm.count = obj[0].id
                this.rechargeForm.money = obj[0].money
                // this.rechargeForm.count = val
            },
            // 取消修改类型
            cancelCount() {
                this.count = false
                this.$refs.count.reset()
            },
            // 上传头像
            changeUrl(file) {
                let form = new FormData()
                form.append('file', file.file)
                this.$api.uploadFile(form).then((res) => {
                    if (res) {
                        this.rechargeForm.url = res.url
                        this.$forceUpdate()
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .upload_control {
        border: 1px solid #eee;
        padding: 20px;
        border-radius: 5px;
    }

    .upload_avatar {
        width: 5.3rem;
        height: 5.3rem;
        margin-left: .8rem;
        display: inline-block;
        position: relative;
        top: 21px;
        border: 1px solid #eee;
        border-radius: 5px;
    }
</style>