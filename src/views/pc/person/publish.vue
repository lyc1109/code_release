<template>
    <div>
<!--        <el-tabs v-model="publishTab" @tab-click="changeTabs(publishTab)" type="card">-->
<!--            <el-tab-pane v-for="(item, index) in publishTabList" :key="index" :name="item.name"-->
<!--                         :label="item.label"></el-tab-pane>-->
<!--        </el-tabs>-->
        <el-form :model="publishForm" ref="publish" :rules="publishRule" label-width="100px">
            <el-form-item prop="type" label="类型">
                <el-radio-group v-model="publishForm.type" size="mini">
                    <el-radio v-for="(item, index) in typeList" :key="index" :label="item.id">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="sectionId" label="所属行业">
                <el-select v-model="publishForm.sectionId" placeholder="请选择所属行业" size="mini">
                    <el-option v-for="(item, index) in tradeList" :key="index" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="area" label="所属地区">
                <el-cascader v-model="publishForm.area" :options="areaList" size="mini"></el-cascader>
            </el-form-item>
            <el-form-item prop="name" label="名称">
                <el-input v-model="publishForm.name" placeholer="请输入名称" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="介绍">
                <el-input v-model="publishForm.description" placeholder="请输入介绍" size="mini" type="textarea" rows="4"></el-input>
            </el-form-item>
            <el-form-item prop="url" label="展示图片">
                <el-upload action="/api/file/add"
                           :on-success="changeCover"
                           class="avatar-uploader"
                           :show-file-list="false"
                           :before-upload="beforeCoverUpload">
                    <img v-if="publishForm.url && publishForm.url !== ''" :src="publishForm.url" class="avatar">
                    <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                </el-upload>
            </el-form-item>
            <el-form-item prop="imgUrl1" label="群二维码">
                <el-upload action="/api/file/add"
                           :on-success="changeGroupCode"
                           class="avatar-uploader"
                           :show-file-list="false"
                           :before-upload="beforeGroupCodeUpload">
                    <img v-if="publishForm.imgUrl1 && publishForm.imgUrl1 !== ''" :src="publishForm.imgUrl1"
                         class="avatar">
                    <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                </el-upload>
            </el-form-item>
            <el-form-item prop="imgUrl2" label="群主二维码" v-if="publishForm.type === 'wxq'">
                <el-upload action="/api/file/add"
                           :on-success="changeOwnerCode"
                           class="avatar-uploader"
                           :show-file-list="false"
                           :before-upload="beforeOwnerCodeUpload">
                    <img v-if="publishForm.imgUrl2 && publishForm.imgUrl2 !== ''" :src="publishForm.imgUrl2"
                         class="avatar">
                    <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                </el-upload>
            </el-form-item>
            <el-form-item prop="ownerWechat" label="群主微信号" v-if="publishForm.type === 'wxq'">
                <el-input v-model="publishForm.ownerWechat" placeholer="请输入群主微信号" size="mini"></el-input>
            </el-form-item>
            <el-form-item>
                发布或修改需要消费: <span style="color: red; font-weight: bold;">10</span>金币，剩余<span style="color: red; font-weight: bold;">{{ coin }}</span>金币
                <el-button type="success" size="mini" @click="recharge" style="margin-left: 5px;">充值</el-button>
                <el-button type="success" size="mini" @click="getGold">赚金币</el-button>
            </el-form-item>
            <el-form-item style="text-align: right;">
                <el-button type="primary" @click="toPublish('publish')" size="mini">{{ title }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import areaList from '@/utils/city'

    export default {
        name: "edit",
        props: {
            types: {
                type: String,
                default: 'wxq'
            },
            coin: {
                type: Number,
                default: 0
            }
        },
        data() {
            // let validUrl = (rule, value, callback) => {
            //     if (this.publishForm.url === '') {
            //         callback(new Error('请上传展示图片'))
            //     } else {
            //         callback()
            //     }
            // }
            // let validImgUrl = (rule, value, callback) => {
            //     if (this.publishForm.imgUrl1 === '') {
            //         callback(new Error('请上传二维码'))
            //     } else {
            //         callback()
            //     }
            // }
            // let validImgUrl2 = (rule, value, callback) => {
            //     if (this.publishForm.imgUrl2 === '') {
            //         callback(new Error('请上传群主二维码'))
            //     } else {
            //         callback()
            //     }
            // }
            return {
                publishTab: '',
                publishTabList: [
                    {label: '发布', value: 'fb'},
                    {label: '文章', value: 'wz'}
                ],
                publishForm: {
                    type: this.types,
                    sectionId: '',
                    area: [],
                    name: '',
                    description: '',
                    url: '',
                    imgUrl1: '',
                    imgUrl2: '',
                    position1: '',
                    position2: '',
                    position3: '',
                    ownerWechat: ''
                },
                publishRule: {
                    sectionId: [{ required: true, message: '请选择行业', trigger: 'change' }],
                    area: [{ required: true, message: '请选择地区', trigger: 'change' }],
                    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                    description: [{ required: true, message: '请输入介绍', trigger: 'change' }],
                    // url: [{ required: true, validator: validUrl, trigger: 'change' }],
                    // imgUrl1: [{ required: true, validator: validImgUrl, trigger: 'change' }],
                    // imgUrl2: [{ required: true, validator: validImgUrl2, trigger: 'change' }],
                    ownerWechat: [{ required: true, message: '请输入群主微信号', trigger: 'change' }]
                },
                typeList: [
                    { name: '微信群', id: 'wxq' },
                    { name: '公众号', id: 'gzh' },
                    { name: '个人微信号', id: 'gr' },
                    { name: '其他', id: 'qt' }
                ],
                tradeList: [],
                areaList: areaList,
                imageUrl: '',
                userInfo: {
                    money: 200
                },
                title: '发布'
            }
        },
        created() {
            if (this.$route.query.id) {
                this.fetchData()
            }
        },
        mounted() {
            this.fetchTrade()
            if (this.$route.query && this.$route.query.title) {
                return this.$route.query.title.includes('发布') ? this.title = '发布' : this.title = '编辑'
            }
            if (this.$route.query && this.$route.query.type) {
                this.publishForm.type = this.$route.query.type
            }
        },
        watch: {
            types(val) {
                this.publishForm.type = val
            }
        },
        methods: {
            fetchData() {
                this.$api.getArticle({
                    id: this.$route.query.id ? this.$route.query.id : ''
                }).then((res) => {
                    if (res) {
                        this.publishForm = res.info
                        this.publishForm.area = [this.publishForm.position1, this.publishForm.position2, this.publishForm.position3]
                        this.publishForm.type = this.$route.query.type
                    }
                })
            },
            // 获取行业列表
            fetchTrade() {
                this.$api.getTrade().then((res) => {
                    if (res) {
                        this.tradeList = res.data
                    }
                })
            },
            // 切换tabs
            changeTabs(val) {
                console.log(val)
            },
            // 展示图片上传成功
            changeCover(res) {
                // this.publishForm.cover = URL.createObjectURL(file.raw);
                this.publishForm.url = res.data.url
                // console.log(file)
            },
            // 展示图片上传到服务器前
            beforeCoverUpload(file) {
                console.log(file)
            },
            // 群二维码上传成功
            changeGroupCode(res) {
                this.publishForm.imgUrl1 = res.data.url
            },
            // 群二维码上传到服务器前
            beforeGroupCodeUpload(file) {
                console.log(file)
            },
            // 群主二维码上传成功
            changeOwnerCode(res) {
                this.publishForm.imgUrl2 = res.data.url
            },
            // 群主二维码上传到服务器前
            beforeOwnerCodeUpload(file) {
                console.log(file)
            },
            // 发布/编辑
            toPublish(formName) {
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
                // console.log(form)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.publishForm.url || this.publishForm.url === '') {
                            this.$message.error('请上传展示图片')
                            return false
                        }
                        if (!this.publishForm.imgUrl1 || this.publishForm.imgUrl1 === '') {
                            this.$message.error('请上传群二维码')
                            return false
                        }
                        if (this.publishForm.type === 'wxq' && (!this.publishForm.imgUrl2 || this.publishForm.imgUrl2 === '')) {
                            this.$message.error('请上传群主二维码')
                            return false
                        }
                        this.$api.addStaticQRCode(this.publishForm).then((res) => {
                            if (res) {
                                this.$message.success(`${this.title}成功`)
                                setTimeout(() => {
                                    this.$router.push('/person')
                                    this.$router.go(0)
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