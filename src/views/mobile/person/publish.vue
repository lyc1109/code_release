<template>
    <div class="publish_m">
        <van-cell-group>
            <!--<van-cell title="类型" is-link :value="publishForm.type" @click="type = true" required></van-cell>-->
            <!--<van-cell title="所属行业" is-link :value="section" @click="trade = true" required></van-cell>-->
            <van-cell title="地区" is-link :value="publishForm.area" @click="area = true" required></van-cell>
            <van-field v-model="publishForm.name" required clearable placeholder="请填写名称" label="名称"
                       :error-message="titleError" @input="changeTit(publishForm.name)"></van-field>
            <van-field v-model="publishForm.description" type="textarea" clearable placeholder="请填写介绍" label="介绍"></van-field>
            <van-cell title="展示图片" required>
                <div slot="label">
                    <van-uploader :after-read="changeShowCover" :max-size="maxSize">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="publishForm.url" alt="" class="upload_avatar"
                         v-if="publishForm.url && publishForm.url !== ''">
                </div>
            </van-cell>
            <van-cell :title="codeText" required>
                <div slot="label">
                    <van-uploader :after-read="changeShowGroup" :max-size="maxSize">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="publishForm.imgUrl1" alt="" class="upload_avatar"
                         v-if="publishForm.imgUrl1 && publishForm.imgUrl1 !== ''">
                </div>
            </van-cell>
            <van-cell title="群主二维码" v-if="$route.query.modelType === 1" required>
                <div slot="label">
                    <van-uploader :after-read="changeShowOwner" :max-size="maxSize">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="publishForm.imgUrl2" alt="" class="upload_avatar"
                         v-if="publishForm.imgUrl2 && publishForm.imgUrl2 !== ''">
                </div>
            </van-cell>
            <van-field v-model="publishForm.ownerWechat" required clearable placeholder="请填写群主微信号" label="群主微信号"
                       :error-message="wechatError" v-if="$route.query.modelType === 1"
                       @input="changeWechat(publishForm.ownerWechat)"></van-field>
            <p class="tips">提示：发布需要消费<b>{{ gold }}</b>金币，剩余<b>{{ userData.gold }}</b>金币</p>
        </van-cell-group>
        <div class="operate_btn flex">
            <van-button type="info" @click="save">发布</van-button>
            <van-button @click="toRecharge">充值</van-button>
            <van-button @click="toGetGold">赚金币</van-button>
        </div>

        <!--<van-popup v-model="type" position="bottom">-->
            <!--<van-picker :columns="typeList" @confirm="changeType" @cancel="cancelType" show-toolbar ref="type"></van-picker>-->
        <!--</van-popup>-->
        <!--<van-popup v-model="trade" position="bottom">-->
            <!--<van-picker :columns="tradeList" @confirm="changeTrade" @cancel="cancelTrade" show-toolbar ref="trade" value-key="name"></van-picker>-->
        <!--</van-popup>-->
        <van-popup v-model="area" position="bottom">
            <van-area :area-list="areaList" @confirm="changeArea" @cancel="cancelArea" ref="area"></van-area>
        </van-popup>
    </div>
</template>

<script>
    import areaList from '@/utils/area'
    import {Toast} from 'vant'

    export default {
        name: "publish",
        data() {
            return {
                areaList: areaList,
                publishForm: {
                    type: '微信群',
                    sectionId: '',
                    area: '',
                    name: '',
                    description: '',
                    url: '',
                    imgUrl1: '',
                    imgUrl2: '',
                    ownerWechat: ''
                },
                titleError: '',
                wechatError: '',
                userData: {
                    gold: 0
                },
                typeList: ['微信群', '公众号', '个人微信号', '其他'],
                tradeList: [],
                type: false,
                trade: false,
                area: false,
                section: '',
                gold: 0,
                codeText: '二维码'
            }
        },
        created() {
            if (this.$route.query) {
                this.publishForm.sectionId = this.$route.query.type
                if (this.$route.query.modelType)
                    this.codeText = '群二维码'
                else
                    this.codeText = '二维码'
            }
            // if (this.$route.query && this.$route.query.title && this.$route.query.title.includes('编辑')) {
            //     this.fetchData()
            // }
            this.fetchTrade()
//            if (this.$route.query && this.$route.query.type) {
//                switch (this.$route.query.type) {
//                    case 'wxq':
//                        this.publishForm.type = '微信群'
//                        break
//                    case 'gzh':
//                        this.publishForm.type = '公众号'
//                        break
//                    case 'gr':
//                        this.publishForm.type = '个人微信号'
//                        break
//                    case 'qt':
//                        this.publishForm.type = '其他'
//                        break
//                    case '微信群':
//                        this.publishForm.type = '微信群'
//                        break
//                    case '公众号':
//                        this.publishForm.type = '公众号'
//                        break
//                    case '个人微信号':
//                        this.publishForm.type = '个人微信号'
//                        break
//                    case '其他':
//                        this.publishForm.type = '其他'
//                        break
//                    // no default
//                }
//            }
            this.fetchCount()
        },
        computed: {
            maxSize() {
                return 1024 * 1024 * 5
            }
        },
        methods: {
            // 初始化数据
            // fetchData() {
            //     this.$api.getArticle({
            //         id: this.$route.query.id ? this.$route.query.id : ''
            //     }).then((res) => {
            //         if (res) {
            //             this.publishForm = res.info
            //             this.publishForm.area = this.publishForm.position1 + this.publishForm.position2 + this.publishForm.position3
            //             // this.publishForm.type = this.$route.query.type
            //         }
            //     })
            // },
            // 获取行业列表
            fetchTrade() {
                if (this.$route.query.type) {
                    this.$api.getTrade().then((res) => {
                        if (res) {
                            this.gold = Math.abs(res.sectionId2PriceMap[this.$route.query.type])
                        }
                    })
                }
            },
            // 金币初始化
            fetchCount() {
                // 获取个人中心信息
                this.$api.getBuzzInfo().then((res) => {
                    if (res) {
                        this.userData.gold = res.coin
                    }
                })
            },
            // 上传展示图片
            changeShowCover(file) {
                let form = new FormData()
                form.append('file', file.file)
                this.$api.uploadFile(form).then((res) => {
                    if (res) {
                        this.publishForm.url = res.url
                        this.$forceUpdate()
                    }
                })
            },
            // 上传群二维码
            changeShowGroup(file) {
                let form = new FormData()
                form.append('file', file.file)
                this.$api.uploadFile(form).then((res) => {
                    if (res) {
                        this.publishForm.imgUrl1 = res.url
                        this.$forceUpdate()
                    }
                })
            },
            // 上传群主二维码
            changeShowOwner(file) {
                let form = new FormData()
                form.append('file', file.file)
                this.$api.uploadFile(form).then((res) => {
                    if (res) {
                        this.publishForm.imgUrl2 = res.url
                        this.$forceUpdate()
                    }
                })
            },
            // 修改类型
            // changeType(val) {
            //     this.type = false
            //     // console.log(val)
            //     this.publishForm.type = val
            // },
            // // 修改行业
            // changeTrade(val) {
            //     let obj = this.tradeList.filter((value) => {
            //         return val.id === value.id
            //     })
            //     this.trade = false
            //     if (obj.length) {
            //         this.publishForm.sectionId = obj[0].id
            //         this.section = obj[0].name
            //     }
            // },
            // 修改地区
            changeArea(data) {
                this.publishForm.area = ''
                this.area = false
                data.forEach((value) => {
                    this.publishForm.area += value.name
                })
            },
            // 取消修改类型
            // cancelType() {
            //     this.type = false
            //     this.$refs.type.reset()
            // },
            // 取消修改行业
            // cancelTrade() {
            //     this.trade = false
            //     this.$refs.trade.reset()
            // },
            // 取消修改地区
            cancelArea() {
                this.area = false
                this.$refs.area.reset()
            },
            // 充值
            toRecharge() {
                this.$router.push('/recharge')
            },
            // 赚金币
            toGetGold() {
                this.$router.push({
                    path: '/getGold'
                })
            },
            changeTit(val) {
                console.log(val)
                if (val.length === 0)
                    this.titleError = '请输入名称'
                else
                    this.titleError = ''
            },
            changeWechat(val) {
                if (val.length === 0)
                    this.wechatError = '请输入介绍'
                else
                    this.wechatError = ''
            },
            // 保存
            save() {
                if (this.publishForm.type === '微信群') {
                    if (this.publishForm.ownerCode !== '' &&
                        this.wechatError === '' &&
                        this.titleError === '' &&
                        this.publishForm.cover !== '' &&
                        this.publishForm.groupCode !== '' &&
                        this.publishForm.trade !== '' &&
                        this.publishForm.area !== '') {

                        let form = {}
                        if (this.publishForm.area.length > 0) {
                            this.publishForm.position1 = this.publishForm.area[0]
                        }
                        if (this.publishForm.area.length > 1) {
                            this.publishForm.position1 = this.publishForm.area[0]
                            this.publishForm.position2 = this.publishForm.area[1]
                        }
                        if (this.publishForm.area.length > 2) {
                            this.publishForm.position1 = this.publishForm.area[0]
                            this.publishForm.position2 = this.publishForm.area[1]
                            this.publishForm.position3 = this.publishForm.area[2]
                        }
                        form = this.publishForm
                        if (this.type === 'gzh' || this.type === 'gr' || this.type === 'qt') {
                            delete form.ownerWechat
                            delete form.imgUrl2
                        } else if (this.type === 'wxq') {
                            form['ownerWechat'] = this.publishForm.ownerWechat
                            form['imgUrl2'] = this.publishForm.imgUrl2
                        }

                        this.$api.addStaticQRCode(this.publishForm).then((res) => {
                            if (res) {
                                Toast.success('发布成功')
                                setTimeout(() => {
                                    this.$router.push('/person')
                                }, 500)
                            }
                        })
                    } else {
                        if (this.publishForm.trade === '') Toast.fail('请选择所属行业')
                        if (this.publishForm.area === '') Toast.fail('请选择地区')
                        if (this.publishForm.title === '') this.titleError = '请输入名称'
                        if (this.publishForm.cover === '') Toast.fail('请上传展示图片')
                        if (this.publishForm.groupCode === '') Toast.fail('请上传群二维码')
                        if (this.publishForm.ownerCode && this.publishForm.ownerCode === '') Toast.fail('请上传群主二维码')
                        if (this.publishForm.wechat && this.publishForm.wechat === '') this.wechatError = '请输入介绍'
                    }
                } else {
                    if (this.titleError === '' &&
                        this.publishForm.cover !== '' &&
                        this.publishForm.groupCode !== '' &&
                        this.publishForm.trade !== '' &&
                        this.publishForm.area !== '') {
                        Toast.success('发布成功')
                        setTimeout(() => {
                            this.$router.push('/person')
                        }, 500)
                    } else {
                        // if (this.publishForm.type === '') Toast.fail('请选择类型')
                        if (this.publishForm.trade === '') Toast.fail('请选择所属行业')
                        if (this.publishForm.area === '') Toast.fail('请选择地区')
                        if (this.publishForm.title === '') this.titleError = '请输入名称'
                        if (this.publishForm.cover === '') Toast.fail('请上传展示图片')
                        if (this.publishForm.groupCode === '') Toast.fail('请上传群二维码')
                        // if (this.publishForm.ownerCode && this.publishForm.ownerCode === '') Toast.fail('请上传群主二维码')
                        // if (this.publishForm.wechat && this.publishForm.wechat === '') this.wechatError = '请输入介绍'
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .publish_m {
        padding-bottom: 100px;
    }

    .upload_control {
        border: 1px solid #eee;
        padding: 20px;
        border-radius: 5px;
    }

    .upload_avatar {
        width: 4.334rem;
        height: 4.334rem;
        margin-left: .8rem;
        display: inline-block;
        position: relative;
        top: 21px;
        border: 1px solid #eee;
        border-radius: 5px;
    }

    .tips {
        padding: 1rem;
        float: right;

        b {
            color: red;
        }
    }

    .operate_btn {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 44px;

        .van-button--info {
            flex: 2;
        }

        .van-button--default {
            flex: 1;
        }
    }
</style>