<template>
    <div>
        <van-cell-group>
            <van-field v-model="invite.count" type="number" label="推广次数" required clearable :error-message="countError"
                       placeholder="请输入推广次数" @input="changeCount(invite.count)"></van-field>
            <van-field v-model="invite.price" type="number" label="推广单价" required clearable :error-message="priceError"
                       placeholder="请输入推广单价" @input="changePrice(invite.price)"></van-field>
        </van-cell-group>
        <div class="operate_btn flex">
            <van-button type="info" size="large" @click="success">保存</van-button>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant'

    export default {
        name: "invite",
        data() {
            return {
                countError: '',
                priceError: '',
                invite: {
                    count: 0,
                    price: 0
                }
            }
        },
        methods: {
            changeCount(val) {
                if (val.length === 0)
                    this.countError = '请输入推广次数'
                else
                    this.countError = ''
            },
            changePrice(val) {
                if (val.length === 0)
                    this.priceError = '请输入推广单价'
                else
                    this.priceError = ''
            },
            success() {
                if (this.countError === '' && this.priceError === '') {
                    this.$api.invitePopularize({
                        codeId: this.$route.params.id,
                        count: this.invite.count,
                        price: this.invite.price
                    }).then((res) => {
                        if (res) {
                            Toast.success('保存成功')
                            setTimeout(() => {
                                this.$router.go(-1)
                            }, 500)
                        }
                    })
                } else {
                    if (this.invite.count === '') Toast.fail('请输入推广次数')
                    if (this.invite.price === '') Toast.fail('请输入推广单价')
                }
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .operate_btn {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 44px;
    }
</style>