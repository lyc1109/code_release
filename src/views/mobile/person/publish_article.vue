<template>
    <div class="publish_m">
        <van-cell-group>
            <!--<van-cell title="所属行业" :value="section" is-link required @click="trade = true"></van-cell>-->
            <van-field v-model="publishForm.name"
                       placeholder="请输入名称"
                       required
                       clearable
                       label="名称"
                       :error-message="titleError"
                       @input="changeTit(publishForm.name)"></van-field>
            <van-field v-model="publishForm.description"
                       placeholder="请输入摘要"
                       clearable
                       label="摘要"
                       type="textarea" rows="4"></van-field>
            <van-field v-model="publishForm.content"
                       placeholder="请输入文章内容"
                       required
                       clearable
                       label="文章内容"
                       :error-message="contentError"
                       @input="changeContent(publishForm.content)"
                       type="textarea" rows="6"></van-field>
            <van-cell title="封面图">
                <div slot="label">
                    <van-uploader :after-read="changeCover" :max-size="maxSize">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="publishForm.coverUrl" v-if="publishForm.coverUrl && publishForm.coverUrl !== ''"
                         class="upload_avatar">
                </div>
            </van-cell>
            <p class="tips">提示：发布或修改需要消费<b>{{ gold }}</b>金币，剩余<b>{{ userData.gold }}</b>金币</p>
            <div class="operate_btn">
                <van-button type="info" size="large" @click="save">发布</van-button>
            </div>
        </van-cell-group>

        <!--<van-popup v-model="trade" position="bottom">-->
            <!--<van-picker :columns="tradeList" @confirm="changeTrade" @cancel="cancelTrade" ref="trade" value-key="name"-->
                        <!--show-toolbar></van-picker>-->
        <!--</van-popup>-->
    </div>
</template>

<script>
    import {Toast} from 'vant'

    export default {
        name: "publish_article",
        data() {
            return {
                publishForm: {
                    sectionId: '',
                    name: '',
                    description: '',
                    content: '',
                    coverUrl: ''
                },
                userData: {
                    gold: 0
                },
                titleError: '',
                contentError: '',
                trade: false,
                tradeList: [],
                section: '',
                gold: 0
            }
        },
        computed: {
            maxSize() {
                return 1024 * 1024 * 5
            }
        },
        created() {
            this.fetchTrade()
            if (this.$route.query) {
                this.publishForm.sectionId = this.$route.query.type
                if (this.$route.query.id) {
                    this.fetchData()
                }
            }
            this.fetchCount()
        },
        methods: {
            // 编辑时初始化数据
            fetchData() {
                this.$api.getArticle({
                    id: this.$route.query.id ? this.$route.query.id : ''
                }).then((res) => {
                    if (res) {
                        this.publishForm = res.info
                        this.publishForm.coverUrl = res.info.url
                        if (this.tradeList.length) {
                            this.tradeList.forEach((value) => {
                                if (value.id === this.publishForm.sectionId) {
                                    this.section = value.name
                                }
                            })
                        }
                    }
                })
            },
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
            // 验证名称
            changeTit(val) {
                if (val.length === 0)
                    this.titleError = '请输入名称'
                else
                    this.titleError = ''
            },
            // 验证内容
            changeContent(val) {
                if (val.length === 0)
                    this.contentError = '请输入文章内容'
                else
                    this.contentError = ''
            },
            // 上传封面图图
            changeCover(file) {
                let form = new FormData()
                form.append('file', file.file)
                this.$api.uploadFile(form).then((res) => {
                    if (res) {
                        this.publishForm.coverUrl = res.url
                        this.$forceUpdate()
                    }
                })
            },
            changeTrade(data) {
                let obj = this.tradeList.filter((value) => {
                    return data.id === value.id
                })
                this.trade = false
                if (obj.length) {
                    this.publishForm.sectionId = obj[0].id
                    this.section = obj[0].name
                }
            },
            cancelTrade() {
                this.trade = false
                this.$refs.trade.reset()
            },
            save() {
                if (this.publishForm.sectionId !== '' && this.titleError === '' && this.contentError === '' && this.publishForm.coverUrl !== '') {
                    this.$api.addArticle(this.publishForm).then((res) => {
                        if (res) {
                            Toast.success('保存成功')
                            setTimeout(() => {
                                this.$router.push('/person')
                            }, 500)
                        }
                    })
                } else {
                    if (this.publishForm.sectionId === '') Toast.fail('请选择所属行业')
                    if (this.publishForm.name === '') this.titleError = '请输入名称'
                    if (this.publishForm.content === '') this.contentError = '请输入文章内容'
                    if (this.publishForm.coverUrl === '') Toast.fail('请上传封面图')
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

        /*.van-button {*/
        /*    flex: 1;*/
        /*}*/
    }
</style>