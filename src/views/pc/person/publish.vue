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
            <el-form-item prop="trade" label="所属行业">
                <el-select v-model="publishForm.trade" placeholder="请选择所属行业" size="mini">
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
            <el-form-item prop="introduce" label="介绍">
                <el-input v-model="publishForm.introduce" placeholder="请输入介绍" size="mini"></el-input>
            </el-form-item>
            <el-form-item prop="cover" label="展示图片">
                <el-upload action="/"
                           :on-change="changeCover"
                           class="avatar-uploader"
                           :show-file-list="false"
                           :auto-upload="false"
                           :before-upload="beforeCoverUpload">
                    <img v-if="publishForm.cover && publishForm.cover !== ''" :src="publishForm.cover" class="avatar">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item prop="groupCode" label="群二维码">
                <el-upload action="/"
                           :on-success="changeGroupCode"
                           class="avatar-uploader"
                           :show-file-list="false"
                           :auto-upload="false"
                           :before-upload="beforeGroupCodeUpload">
                    <img v-if="publishForm.groupCode && publishForm.groupCode !== ''" :src="publishForm.groupCode"
                         class="avatar">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item prop="ownerCode" label="群主二维码" v-if="publishForm.type === 'wxq'">
                <el-upload action="/"
                           :on-success="changeOwnerCode"
                           class="avatar-uploader"
                           :show-file-list="false"
                           :auto-upload="false"
                           :before-upload="beforeOwnerCodeUpload">
                    <img v-if="publishForm.ownerCode && publishForm.ownerCode !== ''" :src="publishForm.ownerCode"
                         class="avatar">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item prop="wechat" label="群主微信号" v-if="publishForm.type === 'wxh'">
                <el-input v-model="publishForm.wechat" placeholer="请输入群主微信号" size="mini"></el-input>
            </el-form-item>
            <el-form-item>
                发布或修改需要消费: <span style="color: red; font-weight: bold;">10</span>金币，剩余<span style="color: red; font-weight: bold;">{{ userInfo.money }}</span>金币
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
    export default {
        name: "edit",
        props: {
            types: {
                type: String,
                default: 'wxq'
            }
        },
        data() {
            return {
                publishTab: '',
                publishTabList: [
                    {label: '发布', value: 'fb'},
                    {label: '文章', value: 'wz'}
                ],
                publishForm: {
                    type: this.types,
                    trade: '',
                    area: [],
                    name: '',
                    introduce: '',
                    cover: '',
                    groupCode: '',
                    ownerCode: '',
                },
                publishRule: {},
                typeList: [
                    { name: '微信群', id: 'wxq' },
                    { name: '公众号', id: 'gzh' },
                    { name: '个人微信号', id: 'gr' },
                    { name: '其他', id: 'qt' }
                ],
                tradeList: [],
                areaList: [],
                imageUrl: '',
                userInfo: {
                    money: 200
                },
                title: '发布'
            }
        },
        mounted() {
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
            // 切换tabs
            changeTabs(val) {
                console.log(val)
            },
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
            // 群二维码上传成功
            changeGroupCode(res, file) {
                this.publishForm.groupCode = URL.createObjectURL(file.raw);
            },
            // 群二维码上传到服务器前
            beforeGroupCodeUpload(file) {
                console.log(file)
            },
            // 群主二维码上传成功
            changeOwnerCode(res, file) {
                this.publishForm.ownerCode = URL.createObjectURL(file.raw);
            },
            // 群主二维码上传到服务器前
            beforeOwnerCodeUpload(file) {
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