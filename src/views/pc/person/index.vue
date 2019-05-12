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

                <el-menu :default-active="defaultVal" mode="vertical" background-color="#545c64" active-text-color="#ffd04b" text-color="#fff" :default-openeds="defaultOpen">
                    <el-submenu index="content">
                        <template slot="title">内容管理</template>
                        <el-menu-item v-for="(item, index) in contentList" :key="index" :index="item.value">{{ item.name }}</el-menu-item>
                    </el-submenu>
                    <el-submenu index="person">
                        <template slot="title">个人中心</template>
                        <el-menu-item v-for="(item, index) in personList" :key="index" :index="item.value" router>{{ item.name }}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="17">
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
                    <div class="article_list"></div>
                </div>
            </el-col>
        </el-row>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/pc/header'
    import footerBox from '@/components/pc/footer'

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
                    { name: '发布个人微信', value: 'wxh' },
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
                    total: 10
                },
                listName: '',
                listNameList: [
                    { name: '妈妈群', id: 'mm' },
                    { name: '粉丝群', id: 'fs' }
                ]
            }
        },
        methods: {
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
            }
        },
        components: {
            headerBox,
            footerBox
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
</style>