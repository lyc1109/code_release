<template>
    <div class="home">
        <header-box actived="/person" type="person"></header-box>
        <el-row class="article_main">
            <el-col :span="6" style="margin-right: 20px;">
                <div class="user_avatar">
                    <img src="../../../assets/images/avatar.jpg" alt="">
                </div>
                <p class="user_name">最帅的仔</p>
                <div class="user_info_num_list flex">
                    <div class="user_info_num" v-for="(item, index) in userInfo" :key="index">
                        <span class="info_num">{{ item.num }}</span>
                        <p>{{ item.title }}</p>
                    </div>
                </div>

                <el-menu :default-active="defaultVal" mode="vertical" background-color="#545c64" active-text-color="#ffd04b" text-color="#fff" :default-openeds="defaultOpen" @select="changeMenu">
                    <el-submenu index="content">
                        <template slot="title">内容管理</template>
                        <el-menu-item v-for="(item, index) in contentList" :key="index" :index="item.value">{{ item.name }}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="person">
                        <template slot="title">个人中心</template>
                        <el-menu-item v-for="(item, index) in personList" :key="index" :index="item.value">{{ item.name }}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="17">
                <!--个人中心首页-->
                <div class="person_index" v-if="defaultVal === ''">
                    <el-tabs v-model="personTab" type="card" @tab-click="changePersonTab">
                        <el-tab-pane v-for="(item, index) in personTabList" :key="index" :label="item.name" :name="item.value"></el-tab-pane>
                    </el-tabs>

                    <!--发布/文章-->
                    <div class="publish_list" v-if="personTab === 'fb' || personTab === 'wz'">
                        <el-select v-model="listName" placeholder="请选择栏目">
                            <el-option v-for="(item, index) in listNameList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <div class="article_list" v-for="(item, index) in articleList" :key="index" @click="articleDetail(item.id)">
                            <div class="article_img">
                                <img :src="item.imgUrl" alt="">
                            </div>
                            <div class="article_info">
                                <h3><el-button type="text">{{ item.title }}</el-button></h3>
                                <p>{{ item.desc }}</p>
                                <div class="article_info_detail">
                                    <span>微信群</span>
                                    <span>发布时间：{{ item.created }}</span>
                                    <i class="iconai-eye iconfont"></i>
                                    <span style="margin-left: 5px;">{{ item.watchNum }}</span>
                                </div>
                            </div>
                            <div class="share">
                                <el-button type="text">编辑</el-button>
                                <el-button type="text" style="color: red;">删除</el-button>
                            </div>
                        </div>
                        <el-pagination :current-page.sync="page.current"
                                       :page-size="page.size"
                                       :total="page.total"
                                       background
                                       layout="total, prev, pager, next, jumper"
                                       @size-change="changeSize"
                                       @current-change="changePage" style="float: right;margin-top: 10px;"></el-pagination>
                    </div>
                    <div class="article_list" v-if="personTab === 'tg'">
                        <el-select v-model="articleVal" placeholder="请选择栏目">
                            <el-option v-for="(item, index) in articleTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <div class="wxq">
                            <div class="wxq_box" v-for="(item, index) in ewmList" :key="index" @click="groupDetail(item.id)">
                                <div>
                                    <img :src="item.url">
                                </div>
                                <h5>{{ item.title }}</h5>
                                <span>推广{{ item.spread }}次, 赚取{{ item.money }}金币</span>
                                <span @click="delArticle(item)">删除</span>
                            </div>
                        </div>
                        <el-pagination :current-page.sync="page.current"
                                       :page-size="page.articleSize"
                                       :total="page.total"
                                       background
                                       layout="total, prev, pager, next, jumper"
                                       @size-change="changeArticleSize"
                                       @current-change="changeArticleCurrent" style="float: right;margin-top: 10px;margin-bottom: 10px;"></el-pagination>
                    </div>
                </div>

                <!--发布编辑-->
                <publish-box
                        v-if="defaultVal === 'wxq' || defaultVal === 'gzh' || defaultVal === 'gr' || defaultVal === 'qt'" :types="defaultVal" @jump="getVal">
                </publish-box>
                <!--发布文章-->
                <publish-article v-if="defaultVal === 'wz'"></publish-article>
                <!--资料-->
                <profile-box v-if="defaultVal === 'zl'"></profile-box>
                <!--充值-->
                <recharge-box v-if="defaultVal === 'cz'"></recharge-box>
                <!--明细-->
                <record-box v-if="defaultVal === 'mx'"></record-box>
                <!--规则-->
                <rule-box v-if="defaultVal === 'gz'"></rule-box>
            </el-col>
        </el-row>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/pc/header'
    import footerBox from '@/components/pc/footer'
    import publishBox from '@/views/pc/person/publish'
    import publishArticle from '@/views/pc/person/publishArticle'
    import profileBox from '@/views/pc/person/profile'
    import rechargeBox from '@/views/pc/person/recharge'
    import recordBox from '@/views/pc/person/record'
    import ruleBox from '@/views/pc/person/rule'

    export default {
        name: "person",
        data() {
            return {
                userInfo: [
                    {title: '金币', num: 500},
                    {title: '发布', num: 5},
                    {title: '推广', num: 3},
                    {title: '文章', num: 8}
                ],
                defaultVal: '',
                contentList: [
                    { name: '发布微信群', value: 'wxq' },
                    { name: '发布公众号', value: 'gzh' },
                    { name: '发布个人微信', value: 'gr' },
                    { name: '发布文章', value: 'wz' },
                    { name: '发布其他', value: 'qt' }
                ],
                personList: [
                    { name: '修改资料', value: 'zl' },
                    { name: '我要充值', value: 'cz' },
                    { name: '明细纪录', value: 'mx' },
                    { name: '金币规则', value: 'gz' }
                ],
                defaultOpen: [ 'content', 'person' ],
                personTab: 'fb',
                personTabList: [
                    { name: '发布', value: 'fb' },
                    { name: '推广', value: 'tg' },
                    { name: '文章', value: 'wz' }
                ],
                articleList: [
                    {
                        id: '1',
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    },
                    {
                        id: '2',
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    },
                    {
                        id: '3',
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    },
                    {
                        id: '4',
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    }
                ],
                page: {
                    current: 1,
                    size: 5,
                    articleSize: 10,
                    total: 10
                },
                listName: '',
                listNameList: [
                    { name: '妈妈群', id: 'mm' },
                    { name: '粉丝群', id: 'fs' }
                ],
                ewmList: [
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>',
                        spread: 12,
                        money: 50
                    }
                ],
                articleVal: '',
                articleTypeList: []
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            // 初始化数据
            fetchData() {
                if (this.$route.query.type) {
                    this.defaultVal = this.$route.query.type
                }
                console.log('初始化数据')
            },
            // 筛选首页文章
            changePersonTab(val) {
                console.log(val)
            },
            // 文章详情
            articleDetail(id) {
                this.$router.push(`/article/${id}`)
            },
            // 修改文章每页展示的条数
            changeSize(val) {
                this.page.size = val
                this.fetchData()
            },
            // 修改文章页数
            changePage(val) {
                this.page.current = val
                this.fetchData()
            },
            // 删除推广文章
            delArticle(data) {
                this.$confirm('确定删除此推广文章？')
                    .then(() => {
                        this.$message.success('删除成功')
                        this.fetchData()
                    })
            },
            // 修改文章每页展示的条数
            changeArticleSize(val) {
                this.page.articleSize = val
                this.fetchData()
            },
            // 修改文章页数
            changeArticleCurrent(val) {
                this.page.current = val
                this.fetchData()
            },
            // 修改menu
            changeMenu(val) {
                this.defaultVal = val
                const obj = this.contentList.filter((value) => {
                    return this.defaultVal === value.value
                })
                const obj1 = this.personList.filter((value) => {
                    return this.defaultVal === value.value
                })
                console.log(obj)
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        title: obj.length > 0 ? obj[0].name : obj1[0].name,
                        type: this.defaultVal
                    }
                })
            },
            getVal(obj) {
                this.defaultVal = obj.type
            }
        },
        components: {
            headerBox,
            footerBox,
            publishBox,
            publishArticle,
            profileBox,
            rechargeBox,
            recordBox,
            ruleBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .article_main {
        margin-top: 5%;

        .user_avatar {
            margin-bottom: 20px;
            text-align: center;

            img {
                width: 120px;
                height: 120px;
                border: 3px solid #eee;
                border-radius: 50%;
            }
        }
        .user_name {
            text-align: center;
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .user_info_num {
            line-height: 40px;
            text-align: center;
            flex: 1;

            span {
                font-size: 24px;
                font-weight: bold;
            }
            p {
                font-size: 16px;
            }
        }
    }
    .publish_list {
        /*padding: 20px;*/
        /*display: flex;*/
        flex-wrap: wrap;
        width: 100%;

        .article_list {
            /*width: 50%;*/
            /*border-right: 1px solid #eee;*/
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            display: flex;
            padding: 10px 0;
            position: relative;

            /*&:nth-child(even) {*/
            /*    border-right: 0 none;*/
            /*}*/
            /*&:nth-child(odd) {*/
            /*    padding-left: 0;*/
            /*}*/

            .article_img {
                flex: 0 0 180px;

                img {
                    width: 180px;
                }
            }
            .article_info{
                margin-left: 10px;
                /*width: 300px;*/
                position: relative;

                h3{
                    .el-button {
                        font-size: 16px;
                        font-weight: normal;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 100%;
                        padding: 0;
                        text-align: left;
                    }
                }
                .article_info_detail{
                    font-size: 12px;
                    position: absolute;
                    bottom: 0;

                    span{
                        margin-right: 10px;
                    }
                    .iconai-eye{
                        color: #ccc;
                        position: relative;
                        top: 2px;
                    }
                }
            }
            .share{
                position: absolute;
                bottom: 10px;
                right: 0;
            }
        }
    }
    .wxq {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .wxq_box {
            width: 16.985%;
            text-align: center;
            box-sizing: border-box;
            margin-right: 3%;
            margin-bottom: 10px;
            cursor: pointer;

            &:hover {
                border-color: #3266cc;
            }

            & > last-child {
                margin-right: 0;
            }

            & > div {
                width: 90%;
                height: 0;
                padding: 8px;
                padding-bottom: 100%;
                position: relative;
                border-radius: 8px;
                border: 1px solid #ddd;

                img {
                    /*width: 100%;*/
                    /*height: 100%;*/
                    /*width: 115px;*/
                    /*height: 115px;*/
                }
            }

            h5 {
                color: #333;
                font-size: 16px;
                margin-top: 8px;
                display: inline-block;
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            span{
                color: #888;
                font-size: 12px;
                margin-top: 5px;
                display: inline-block;
                width: 100%;
            }
        }
    }
</style>