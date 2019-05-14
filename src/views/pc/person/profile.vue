<template>
    <el-form :model="profile" ref="profile" :rules="profileRule" label-width="100px">
        <el-form-item prop="nickname" label="昵称">
            <el-input v-model="profile.nickname" placeholer="请输入昵称" size="mini"></el-input>
        </el-form-item>
        <el-form-item prop="avatar" label="头像">
            <el-upload action="/"
                       :show-file-list="false"
                       :auto-upload="false"
                       :on-change="changeAvatar"
                       class="avatar-uploader"
                       :before-upload="beforeAvatarUpload" size="mini">
                <img :src="profile.avatar" v-if="profile.avatar && profile.avatar !== ''" class="avatar" alt="">
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item prop="birthday" label="生日">
            <el-date-picker v-model="profile.birthday" type="date" placeholder="请选择生日" size="mini"></el-date-picker>
        </el-form-item>
        <el-form-item prop="area" label="地区">
            <el-cascader v-model="profile.area" :options="areaList" size="mini"></el-cascader>
        </el-form-item>
        <el-form-item style="text-align: right;">
            <el-button type="primary" @click="save('profile')">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "profile",
        data() {
            return {
                profile: {
                    nickname: '',
                    avatar: '',
                    birthday: '',
                    area: []
                },
                profileRule: {},
                areaList: []
            }
        },
        methods: {
            // 上传头像
            changeAvatar(file) {
                this.profile.avatar = file
            },
            // 上传到服务器前
            beforeAvatarUpload(file) {
                console.log(file)
            },
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message.success(`${this.title}成功`)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .avatar-uploader {
    /deep/.el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    /deep/.el-upload:hover {
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

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    }
</style>