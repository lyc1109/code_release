<template>
    <div>
        <van-cell-group>
            <van-field v-model="profileForm.nickName" required clearable label="昵称" placeholder="请输入昵称"
                       @input="changeNickname(profileForm.nickName)" :error-message="nameError"></van-field>
            <van-cell title="头像">
                <div slot="label">
                    <van-uploader :after-read="changeAvatar" style="display: inline-block;">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="imgUrl" alt="" v-if="imgUrl && imgUrl !== ''" class="upload_avatar">
                </div>
            </van-cell>
            <van-cell title="生日" is-link @click="changeBirthday" :value="profileForm.birthday"></van-cell>
            <van-cell title="地区" is-link @click="changeArea" :value="profileForm.area"></van-cell>
            <div style="padding: 2rem;">
                <van-button type="info" size="large" @click="success">保存</van-button>
            </div>
        </van-cell-group>

        <van-popup v-model="showDate" position="bottom">
            <van-datetime-picker v-model="profileForm.birthday" type="date" @cancel="cancelBirthday" @confirm="selectBirthday"></van-datetime-picker>
        </van-popup>
        <van-popup v-model="showArea" position="bottom">
            <van-area :area-list="areaData" :value="profileForm.area" ref="area" @cancel="cancelArea" @confirm="selectArea"></van-area>
        </van-popup>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    import areaData from '@/utils/area'

    export default {
        name: "profile",
        data() {
            return {
                profileForm: {
                    nickname: '',
                    avatar: '',
                    birthday: new Date(),
                    area: ''
                },
                imgUrl: '',
                areaData: areaData,
                nameError: '',
                showDate: false,
                showArea: false
            }
        },
        methods: {
            // 上传头像
            changeAvatar(file) {
                this.imgUrl = file.content
            },
            changeNickname(val) {
                if (val.length === 0) {
                    this.nameError = '请输入昵称'
                } else {
                    this.nameError = ''
                }
            },
            changeBirthday() {
                this.showDate = true
            },
            changeArea() {
                this.showArea = true
            },
            // 取消选择地区
            cancelArea() {
                this.showArea = false
                this.$refs.area.reset()
            },
            // 选择地区
            selectArea(val) {
                val.forEach((data) => {
                    this.profileForm.area += data.name
                })
                console.log(this.profileForm.area)
                this.showArea = false
            },
            // 取消选择生日
            cancelBirthday() {
                this.showDate = false
                this.profileForm.date = ''
            },
            // 选择生日
            selectBirthday(val) {
                this.profileForm.birthday = val
                this.showDate = false
            },
            success() {
                if (this.nameError === '' && this.imgUrl !== '') {
                    Toast.success('修改成功')
                } else {
                    if (this.profileForm.nickname === '') this.nameError = '请输入昵称'
                    if (this.imgUrl === '') Toast.fail('请上传头像')
                }
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .upload_control{
        border: 1px solid #eee;
        padding: 20px;
        border-radius: 5px;
    }
    .upload_avatar{
        width: 4.334rem;
        height: 4.334rem;
        margin-left: .8rem;
        display: inline-block;
        position: relative;
        top: 21px;
        border: 1px solid #eee;
        border-radius: 5px;
    }
</style>