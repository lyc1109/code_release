<template>
    <div class="publish_m">
        <van-cell-group>
            <van-cell title="类型" is-link :value="publishForm.type" @click="type = true" required></van-cell>
            <van-cell title="所属行业" is-link :value="publishForm.trade" @click="trade = true" required></van-cell>
            <van-cell title="地区" is-link :value="publishForm.area" @click="area = true" required></van-cell>
            <van-field v-model="publishForm.title" required clearable placeholder="请填写名称" label="名称"
                       :error-message="titleError" @input="changeTit(publishForm.title)"></van-field>
            <van-field v-model="publishForm.desc" type="textarea" clearable placeholder="请填写介绍" label="介绍"></van-field>
            <van-cell title="展示图片" required>
                <div slot="label">
                    <van-uploader :after-read="changeShowCover">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="publishForm.cover" alt="" class="upload_avatar"
                         v-if="publishForm.cover && publishForm.cover !== ''">
                </div>
            </van-cell>
            <van-cell title="群二维码" required>
                <div slot="label">
                    <van-uploader :after-read="changeShowGroup">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="publishForm.groupCode" alt="" class="upload_avatar"
                         v-if="publishForm.groupCode && publishForm.groupCode !== ''">
                </div>
            </van-cell>
            <van-cell title="群主二维码" v-if="publishForm.type === '微信群'" required>
                <div slot="label">
                    <van-uploader :after-read="changeShowOwner">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="publishForm.ownerCode" alt="" class="upload_avatar"
                         v-if="publishForm.ownerCode && publishForm.ownerCode !== ''">
                </div>
            </van-cell>
            <van-field v-model="publishForm.wechat" required clearable placeholder="请填写群主微信号" label="群主微信号"
                       :error-message="wechatError" v-if="publishForm.type === '微信群'"
                       @input="changeWechat(publishForm.wechat)"></van-field>
            <p class="tips">提示：发布或修改需要消费<b>10</b>金币，剩余<b>{{ userData.gold }}</b>金币</p>
        </van-cell-group>
        <div class="operate_btn flex">
            <van-button type="info" @click="save">保存</van-button>
            <van-button @click="toRecharge">充值</van-button>
            <van-button @click="toGetGold">赚金币</van-button>
        </div>

        <van-popup v-model="type" position="bottom">
            <van-picker :columns="typeList" @confirm="changeType" @cancel="cancelType" show-toolbar ref="type"></van-picker>
        </van-popup>
        <van-popup v-model="trade" position="bottom">
            <van-picker :columns="tradeList" @confirm="changeTrade" @cancel="cancelTrade" show-toolbar ref="trade"></van-picker>
        </van-popup>
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
                    trade: '',
                    area: '',
                    title: '',
                    desc: '',
                    cover: '',
                    groupCode: '',
                    ownerCode: '',
                    wechat: ''
                },
                titleError: '',
                wechatError: '',
                userData: {
                    gold: 200
                },
                typeList: ['微信群', '公众号', '个人微信号', '其他'],
                tradeList: [
                    {text: '互粉群', value: 'hf'},
                    {text: '妈妈群', value: 'mm'}
                ],
                type: false,
                trade: false,
                area: false
            }
        },
        created() {
            if (this.$route.query && this.$route.query.title && this.$route.query.title.includes('发布')) {
                this.fetchData()
            }
            if (this.$route.query && this.$route.query.type) {
                switch (this.$route.query.type) {
                    case 'wxq':
                        this.publishForm.type = '微信群'
                        break
                    case 'gzh':
                        this.publishForm.type = '公众号'
                        break
                    case 'gr':
                        this.publishForm.type = '个人微信号'
                        break
                    case 'qt':
                        this.publishForm.type = '其他'
                        break
                    case '微信群':
                        this.publishForm.type = '微信群'
                        break
                    case '公众号':
                        this.publishForm.type = '公众号'
                        break
                    case '个人微信号':
                        this.publishForm.type = '个人微信号'
                        break
                    case '其他':
                        this.publishForm.type = '其他'
                        break
                    // no default
                }
            }
        },
        methods: {
            // 初始化数据
            fetchData() {
                console.log('初始化数据')
            },
            // 上传展示图片
            changeShowCover(file) {
                this.publishForm.cover = file.content
            },
            // 上传群二维码
            changeShowGroup(file) {
                this.publishForm.groupCode = file.content
            },
            // 上传群主二维码
            changeShowOwner(file) {
                this.publishForm.ownerCode = file.content
            },
            // 修改类型
            changeType(val) {
                this.type = false
                console.log(val)
                this.publishForm.type = val
            },
            // 修改行业
            changeTrade(val) {
                this.trade = false
                this.publishForm.trade = val
            },
            // 修改地区
            changeArea(data) {
                this.area = false
                data.forEach((value) => {
                    this.publishForm.area += value.name
                })
            },
            // 取消修改类型
            cancelType() {
                this.type = false
                this.$refs.type.reset()
            },
            // 取消修改行业
            cancelTrade() {
                this.trade = false
                this.$refs.trade.reset()
            },
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
                    path: '/list'
                })
            },
            changeTit(val) {
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
                        Toast.success('发布成功')
                        setTimeout(() => {
                            this.$router.push('/person')
                        }, 500)
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