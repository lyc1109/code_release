<template>
    <div class="publish_m">
        <van-cell-group>
            <van-cell title="所属行业" :value="publishForm.trade" is-link required @click="trade = true"></van-cell>
            <van-field v-model="publishForm.title"
                       placeholder="请输入名称"
                       required
                       clearable
                       label="名称"
                       :error-message="titleError"
                       @input="changeTit(publishForm.title)"></van-field>
            <van-field v-model="publishForm.summary"
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
                    <van-uploader :after-read="changeCover">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="publishForm.cover" v-if="publishForm.cover && publishForm.cover !== ''"
                         class="upload_avatar">
                </div>
            </van-cell>
            <p class="tips">提示：发布或修改需要消费<b>20</b>金币，剩余<b>{{ userData.gold }}</b>金币</p>
            <div class="operate_btn">
                <van-button type="info" size="large" @click="save">发布</van-button>
            </div>
        </van-cell-group>

        <van-popup v-model="trade" position="bottom">
            <van-picker :columns="tradeList" @confirm="changeTrade" @cancel="cancelTrade" ref="trade"
                        show-toolbar></van-picker>
        </van-popup>
    </div>
</template>

<script>
    import {Toast} from 'vant'

    export default {
        name: "publish_article",
        data() {
            return {
                publishForm: {
                    trade: '',
                    title: '',
                    summary: '',
                    content: '',
                    cover: ''
                },
                userData: {
                    gold: 200
                },
                titleError: '',
                contentError: '',
                trade: false,
                tradeList: [
                    {text: '互粉群', value: 'hf'},
                    {text: '妈妈群', value: 'mm'}
                ]
            }
        },
        methods: {
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
                this.publishForm.cover = file.content
            },
            changeTrade(value) {
                this.trade = false
                this.publishForm.trade = value
            },
            cancelTrade() {
                this.trade = false
                this.$refs.trade.reset()
            },
            save() {
                if (this.publishForm.trade !== '' && this.titleError === '' && this.contentError === '' && this.publishForm.cover !== '') {
                    Toast.success('保存成功')
                } else {
                    if (this.publishForm.trade === '') Toast.fail('请选择所属行业')
                    if (this.publishForm.title === '') this.titleError = '请输入名称'
                    if (this.publishForm.content === '') this.contentError = '请输入文章内容'
                    if (this.publishForm.cover === '') Toast.fail('请上传封面图')
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