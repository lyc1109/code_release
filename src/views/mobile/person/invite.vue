<template>
    <div>
        <van-cell-group>
            <van-field v-model="invite.count" type="number" label="推广次数" required clearable :error-message="countError"
                       placeholder="请输入推广次数" @input="changeCount(invite.count)"></van-field>
            <!--<van-field v-model="invite.price" type="number" label="推广单价" required clearable :error-message="priceError"-->
                       <!--placeholder="请输入推广单价" @input="changePrice(invite.price)"></van-field>-->
            <van-cell title="推广单价" is-link :value="invite.price" @click="showPrice = true" required></van-cell>
        </van-cell-group>
        <div class="operate_btn flex">
            <van-button type="info" size="large" @click="success">保存</van-button>
        </div>

        <van-popup v-model="showPrice" position="bottom">
            <van-picker @cancel="cancelPrice"
                                 @confirm="selectPrice" :columns="priceList" show-toolbar></van-picker>
        </van-popup>
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
                    price: ''
                },
                showPrice: false,
                priceList: [],
                price: ''
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.$api.getPopularizePriceOption({
                    sectionId: this.$route.query.id ? this.$route.query.id : ''
                }).then((res) => {
                    if (res) {
                        this.priceList = res.priceOptions
                    }
                })
            },
            changeCount(val) {
                if (val.length === 0)
                    this.countError = '请输入推广次数'
                else
                    this.countError = ''
            },
            success() {
                if (this.countError === '' && this.invite.price !== '') {
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
                    if (this.invite.price === '') Toast.fail('请选择推广单价')
                }
            },
            cancelPrice() {
                this.showPrice = false
                this.invite.price = ''
            },
            selectPrice(val) {
                this.invite.price = val
                this.showPrice = false
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