<template>
    <el-form :model="article" ref="article" :rules="articleRule" label-width="100px">
        <!--<el-form-item prop="sectionId" label="所属行业">-->
        <!--<el-select v-model="article.sectionId" placeholder="请选择所属行业" size="mini">-->
        <!--<el-option v-for="(item, index) in tradeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item prop="name" label="名称">
            <el-input v-model="article.name" placeholder="请填写名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="摘要">
            <el-input v-model="article.description" placeholder="请填写摘要" type="textarea" rows="4" size="mini"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
            <el-input v-model="article.content" placeholer="请填写内容" rows="6" type="textarea"></el-input>
        </el-form-item>
        <el-form-item prop="coverUrl" label="封面">
            <el-upload :action="fileUploadUrl"
                       :show-file-list="false"
                       :on-success="changeCover"
                       class="avatar-uploader"
                       :before-upload="beforeCoverUpload"
                       accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PBG,.GIF">
                <img v-if="article.coverUrl && article.coverUrl !== ''" :src="article.coverUrl" class="avatar">
                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            发布或修改需要消费: <span style="color: red; font-weight: bold;">{{ gold }}</span>金币，剩余<span
                style="color: red; font-weight: bold;">{{ coin }}</span>金币
            <el-button type="success" size="mini" @click="recharge" style="margin-left: 5px;">充值</el-button>
            <el-button type="success" size="mini" @click="getGold">赚金币</el-button>
        </el-form-item>
        <el-form-item style="text-align: right;">
            <el-button type="primary" @click="toPublish('article')" size="mini">{{ title }}</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    export default {
        name: "publishArticle",
        props: {
            coin: {
                type: Number,
                default: 0
            }
        },
        data() {
            // let validUrl = (rule, value, callback) => {
            //     if (this.article.coverUrl === '') {
            //         callback(new Error('请上传封面图'))
            //     } else {
            //         callback()
            //     }
            // }
            return {
                article: {
                    sectionId: '',
                    name: '',
                    description: '',
                    content: '',
                    coverUrl: ''
                },
                articleRule: {
                    sectionId: [{required: true, message: '请选择行业', trigger: 'change'}],
                    name: [{required: true, message: '请输入名称', trigger: 'blur'}],
                    description: [{required: true, message: '请输入介绍', trigger: 'change'}],
                    content: [{required: true, message: '请输入内容', trigger: 'change'}],
                    // coverUrl: [{ required: true, validator: validUrl, trigger: 'change' }],
                },
                tradeList: [],
                userInfo: {
                    money: 200
                },
                title: '发布文章',
                fileUploadUrl: `${process.env.VUE_APP_BASE_API}/file/add`,
                gold: 0
            }
        },
        created() {
            if (this.$route.query && this.$route.query.id) {
                this.fetchData()
            }
        },
        watch: {
            $route(to, from) {
                if (to.query) {
                    this.fetchTrade()

                    if (to.query.id) {
                        this.fetchData()
                    } else {
                        this.article.name = ''
                        this.article.description = ''
                        this.article.content = ''
                        this.article.coverUrl = ''
                    }

                    if (to.query.title) {
                        to.query.title.includes('发布') ? this.title = '发布文章' : this.title = '编辑文章'
                    }
                }
            }
        },
        mounted() {
            this.fetchTrade()
            this.fetchCount()
            if (this.$route.query && this.$route.query.title) {
                return this.$route.query.title.includes('发布') ? this.title = '发布文章' : this.title = '编辑文章'
            }
        },
        methods: {
            // 编辑时初始化数据
            fetchData() {
                this.$api.getArticle({
                    id: this.$route.query.id ? this.$route.query.id : ''
                }).then((res) => {
                    if (res) {
                        this.article = res.info
                        this.article.coverUrl = this.article.url
                    }
                })
            },
            fetchCount() {
                if (sessionStorage && sessionStorage.getItem('user')) {
                    console.log(JSON.parse(sessionStorage.getItem('user')))
                    this.userInfo.money = JSON.parse(sessionStorage.getItem('user')).count
                }
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
            // 封面图上传成功
            changeCover(file) {
                // this.article.cover = URL.createObjectURL(file.raw);
                this.article.coverUrl = file.data.url
                // console.log(file)
            },
            // 封面图上传到服务器前
            beforeCoverUpload(file) {
                const isLt2M = file.size / 1024 / 1024 <= 5
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过5M')
                }
            },
            // 发布/编辑
            toPublish(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.article.coverUrl || this.article.coverUrl === '') {
                            this.$message.error('请上传封面')
                            return false
                        }
                        this.article.sectionId = this.$route.query.type
                        this.$api.addArticle(this.article).then((res) => {
                            if (res) {
                                this.$message.success(`${this.title}成功`)
                                setTimeout(() => {
                                    this.$router.push('/person')
                                    // this.$router.go(0)
                                }, 500)
                            }
                        })
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

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>