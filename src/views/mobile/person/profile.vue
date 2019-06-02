<template>
    <div>
        <van-cell-group>
            <van-field v-model="profileForm.nickname" required clearable label="昵称" placeholder="请输入昵称"
                       @input="changeNickname(profileForm.nickname)" :error-message="nameError"></van-field>
            <van-cell title="头像">
                <div slot="label">
                    <van-uploader :after-read="changeAvatar" style="display: inline-block;" :max-size="maxSize">
                        <van-icon name="plus" class="upload_control"></van-icon>
                    </van-uploader>
                    <img :src="profileForm.url" alt="" v-if="profileForm.url" class="upload_avatar">
                </div>
            </van-cell>
            <van-cell title="生日" is-link @click="changeBirthday" :value="profileForm.birth"></van-cell>
            <van-cell title="地区" is-link @click="changeArea" :value="profileForm.area"></van-cell>
            <div style="padding: 2rem;">
                <van-button type="info" size="large" @click="success">保存</van-button>
            </div>
        </van-cell-group>

        <van-popup v-model="showDate" position="bottom">
            <van-datetime-picker v-model="birth" type="date" @cancel="cancelBirthday"
                                 @confirm="selectBirthday"></van-datetime-picker>
        </van-popup>
        <van-popup v-model="showArea" position="bottom">
            <van-area :area-list="areaData" ref="area" @cancel="cancelArea" @confirm="selectArea"></van-area>
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
                    url: '',
                    avatar: '',
                    birth: '',
                    area: ''
                },
                imgUrl: '',
                areaData: areaData,
                nameError: '',
                showDate: false,
                showArea: false,
                birth: new Date()
            }
        },
        created() {
            this.fetchData()
        },
        computed: {
            maxSize() {
                return 1024 * 1024 * 5
            }
        },
        methods: {
            fetchData() {
                this.$api.getUserInfo().then((res) => {
                    if (res) {
                        this.profileForm = res.user
                        this.profileForm.url = res.user.coverUrl
                        if (!this.profileForm.birth) this.profileForm.birth = this.moment(new Date()).format('YYYY-MM-DD')
                        if (res.user.position1 && res.user.position2 && res.user.position3)
                            this.profileForm.area = res.user.position1 + res.user.position2 + res.user.position3
                    }
                })
            },
            // 上传头像
            changeAvatar(file) {
                let form = new FormData()
                form.append('file', file.file)
                this.$api.uploadFile(form).then((res) => {
                    if (res) {
                        this.profileForm.url = res.url
                        this.$forceUpdate()
                    }
                })
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
                this.profileForm.area = ''
                val.forEach((data, index) => {
                    this.profileForm.area += data.name
                    if (index === 0) {
                        this.profileForm['position1'] = data.name
                    }
                    if (index === 1) {
                        this.profileForm['position2'] = data.name
                    }
                    if (index === 2) {
                        this.profileForm['position3'] = data.name
                    }
                })
                this.showArea = false
            },
            // 取消选择生日
            cancelBirthday() {
                this.showDate = false
                this.profileForm.date = ''
            },
            // 选择生日
            selectBirthday(val) {
                this.profileForm.birth = this.moment(val).format('YYYY-MM-DD')
                this.showDate = false
            },
            // 保存
            success() {
                if (this.nameError === '' && this.profileForm.url !== '') {
                    let profile = {
                        nickname: this.profileForm.nickname,
                        url: this.profileForm.url,
                        birth: this.profileForm.birth,
                        position1: this.profileForm.position1,
                        position2: this.profileForm.position2,
                        position3: this.profileForm.position3
                    }
                    this.$api.updatePersonalInfo(profile).then((res) => {
                        if (res) {
                            Toast.success('修改成功')
                            setTimeout(() => {
                                this.$router.go(-1)
                            }, 500)
                        }
                    })
                } else {
                    if (this.profileForm.nickname === '') this.nameError = '请输入昵称'
                    if (this.profileForm.url === '') Toast.fail('请上传头像')
                }
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