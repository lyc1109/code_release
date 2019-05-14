<template>
    <el-form :model="article" ref="article" :rules="articleRule" label-width="100px">
        <el-form-item prop="trade" label="所属行业">
            <el-select v-model="article.trade" placeholder="请选择所属行业" size="mini">
                <el-option v-for="(item, index) in tradeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="name" label="名称">
            <el-input v-model="article.name" placeholder="请填写名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item prop="summary" label="摘要">
            <el-input v-model="article.summary" placeholder="请填写摘要" type="textarea" size="mini"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
            <el-input v-model="article.content" placeholer="请填写内容"></el-input>
        </el-form-item>
        <el-form-item prop="cover" label="封面">
            <el-upload action="/"
                       :auto-upload="false"
                       :show-file-list="false"
                       :on-success="changeCover"
                       class="avatar-uploader"
                       :before-upload="beforeCoverUpload">
                <img v-if="article.cover && article.cover !== ''" :src="article.cover" class="avatar">
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            发布或修改需要消费: <span style="color: red; font-weight: bold;">5</span>金币，剩余<span style="color: red; font-weight: bold;">{{ userInfo.money }}</span>金币
            <el-button type="success" size="mini" @click="recharge" style="margin-left: 5px;">充值</el-button>
            <el-button type="success" size="mini" @click="getGold">赚金币</el-button>
        </el-form-item>
        <el-form-item style="text-align: right;">
            <el-button type="primary" @click="toPublish('publish')" size="mini">{{ title }}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "publishArticle",
        data() {
            return {
                article: {
                    trade: '',
                    name: '',
                    summary: '',
                    content: '',
                    cover: ''
                },
                articleRule: {},
                tradeList: [],
                userInfo: {
                    money: 200
                },
                title: '发布文章'
            }
        },
        mounted() {
            if (this.$route.query && this.$route.query.title) {
                return this.$route.query.title.includes('发布文章') ? this.title = '发布文章' : this.title = '编辑文章'
            }
        },
        methods: {
            // 展示图片上传成功
            changeCover(file) {
                // this.publishForm.cover = URL.createObjectURL(file.raw);
                this.publishForm.cover = file.url
                // console.log(file)
            },
            // 展示图片上传到服务器前
            beforeCoverUpload(file) {
                console.log(file)
            },
            // 发布/编辑
            toPublish(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message.success(`${this.title}成功`)
                    }
                })
            },
            // 充值
            recharge() {
                const query = {
                    title: '充值',
                    type: 'cz'
                }
                this.$router.push({
                    path: this.$route.path,
                    query: query
                })
                this.$emit('jump', query)
            },
            // 赚金币
            getGold() {
                this.$router.push(`/group/gold`)
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