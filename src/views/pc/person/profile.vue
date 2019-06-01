<template>
    <el-form :model="profile" ref="profile" :rules="profileRule" label-width="100px">
        <el-form-item prop="nickname" label="昵称">
            <el-input v-model="profile.nickname" placeholer="请输入昵称" size="mini"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="头像" ref="imgUrl">
            <el-upload :action="fileUploadUrl"
                       :show-file-list="false"
                       :on-success="changeAvatar"
                       class="avatar-uploader"
                       size="mini">
                <img :src="profile.url" v-if="profile.url" class="avatar" alt="">
                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
            <el-date-picker v-model="profile.birth" type="date" placeholder="请选择生日" size="mini"></el-date-picker>
        </el-form-item>
        <el-form-item prop="area" label="地区">
            <el-cascader v-model="profile.area" :options="areaList" size="mini" @change="changeArea"></el-cascader>
        </el-form-item>
        <el-form-item style="text-align: right;">
            <el-button type="primary" @click="save('profile')">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import areaList from '@/utils/city'

    export default {
        name: "profile",
        data() {
            return {
                profile: {
                    nickname: '',
                    url: '',
                    birth: '',
                    area: []
                },
                profileRule: {
                    nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
                    // url: [{required: true, message: '请上传头像', trigger: 'change'}],
                    birth: [{required: true, message: '请选择生日', trigger: 'change'}]
                },
                areaList: areaList,
                avatarList: [],
                fileUploadUrl: `${process.env.VUE_APP_BASE_API}/file/add`
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.$api.getUserInfo().then((res) => {
                    if (res) {
                        console.log(res)
                        this.profile = res.user
                        this.profile.area = [res.user.position1, res.user.position2, res.user.position3]
                    }
                })
            },
            // 上传头像
            changeAvatar(res) {
                this.profile.url = res.data.url
                this.$forceUpdate()
            },
            changeArea(val) {
                console.log(val)
            },
            save(formName) {
                let profile = {}
                if (this.profile.area.length > 0) {
                    profile.position1 = this.profile.area[0]
                }
                if (this.profile.area.length > 1) {
                    profile.position1 = this.profile.area[0]
                    profile.position2 = this.profile.area[1]
                }
                if (this.profile.area.length > 2) {
                    profile.position1 = this.profile.area[0]
                    profile.position2 = this.profile.area[1]
                    profile.position3 = this.profile.area[2]
                }
                profile.nickname = this.profile.nickname
                profile.url = this.profile.url
                profile.birth = this.moment(this.profile.birth).format('YYYY-MM-DD')

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.profile.url) {
                            this.$message.error('请上传头像')
                            return false
                        }
                        this.$api.updatePersonalInfo(profile).then((res) => {
                            if (res) {
                                this.fetchData()
                                this.$message.success(`${this.title}成功`)
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .avatar-uploader {
        /deep/ .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        /deep/ .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>