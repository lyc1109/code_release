<template>
    <div class="home">
        <header-box actived="/person" type="person"></header-box>
        <el-row class="article_main">
            <el-col :span="6" style="margin-right: 20px;">
                <div class="user_avatar">
                    <img :src="user && user.coverUrl ? user.coverUrl : avatar" alt="">
                </div>
                <p class="user_name">{{ user.user }}</p>
                <div class="user_info_num_list flex">
                    <div class="user_info_num" v-for="(item, index) in userInfo" :key="index" @click="selectIndexTab(item)">
                        <span class="info_num">{{ item.num }}</span>
                        <p>{{ item.title }}</p>
                    </div>
                </div>

                <el-menu :default-active="defaultVal" mode="vertical" background-color="#545c64"
                         active-text-color="#ffd04b" text-color="#fff" :default-openeds="defaultOpen"
                         @select="changeMenu">
                    <el-submenu index="content">
                        <template slot="title">内容管理</template>
                        <el-menu-item v-for="(item, index) in contentList" :key="index" :index="item.value">{{ item.name
                            }}
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="person">
                        <template slot="title">个人中心</template>
                        <el-menu-item v-for="(item, index) in personList" :key="index" :index="item.value">{{ item.name
                            }}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="17">
                <!--个人中心首页-->
                <div class="person_index" v-if="defaultVal === ''">
                    <el-tabs v-model="personTab" type="card" @tab-click="changePersonTab(personTab)">
                        <el-tab-pane v-for="(item, index) in personTabList" :key="index" :label="item.name"
                                     :name="item.value"></el-tab-pane>
                    </el-tabs>

                    <!--发布/文章-->
                    <div class="publish_list" v-if="personTab === 'fb' || personTab === 'wz'">
                        <el-select v-model="listName" placeholder="请选择栏目" @change="changeList" size="mini">
                            <el-option v-for="(item, index) in listNameList" :key="index" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                        <div class="article_list" v-for="(item, index) in articleList" :key="index"
                             @click="articleDetail(item)" v-if="articleList.length">
                            <div class="article_img">
                                <img :src="item.url" alt="">
                            </div>
                            <div class="article_info">
                                <h3>
                                    <el-button type="text">{{ item.name }}</el-button>
                                </h3>
                                <p>{{ item.description }}</p>
                                <div class="article_info_detail">
                                    <el-tag size="mini">{{ item.section }}</el-tag>
                                    <el-tag size="mini" v-if="personTab === 'fb'" type="danger">剩余{{ item.popularizeCount }}次({{ item.popularizePrice }}元/次)推广</el-tag>
                                    <span>{{ item.createTime }}</span>
<!--                                    <i class="iconai-eye iconfont"></i>-->
<!--                                    <span style="margin-left: 5px;">{{ item.popOriginalId }}</span>-->
                                </div>
                            </div>
                            <div class="share">
                                <el-button type="text" @click.stop="edit(item)" v-if="personTab === 'wz'">编辑</el-button>
                                <el-button type="text" @click.stop="inviteSpread(item)" v-if="personTab === 'fb'">邀请推广</el-button>
                                <el-button type="text" style="color: red;" @click.stop="del(item.id)">删除</el-button>
                            </div>
                        </div>
                        <el-pagination :current-page.sync="page.current"
                                       :page-size="page.size"
                                       :total="page.total"
                                       background
                                       layout="total, prev, pager, next, jumper"
                                       @size-change="changeSize"
                                       @current-change="changePage" style="float: right;margin-top: 10px;"
                                       v-if="articleList.length"></el-pagination>
                        <p class="text-center" style="font-size: 20px;" v-if="!articleList.length">
                            暂无数据</p>
                    </div>
                    <!--推广-->
                    <div class="article_list" v-if="personTab === 'tg'">
                        <el-select v-model="listName" placeholder="请选择栏目" @change="changeList" size="mini">
                            <el-option v-for="(item, index) in listNameList" :key="index" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                        <div class="wxq">
                            <div class="wxq_box" v-for="(item, index) in ewmList" :key="index"
                                 @click="groupDetail(item.id)">
                                <div>
                                    <img :src="item.url">
                                </div>
                                <h5>{{ item.name }}</h5>
                                <span>推广{{ item.typ }}次, 赚取{{ item.popularizePrice }}金币</span>
                                <span @click="delArticle(item)">删除</span>
                            </div>
                        </div>
                        <el-pagination :current-page.sync="page.current"
                                       :page-size="page.articleSize"
                                       :total="page.articleTotal"
                                       background
                                       layout="total, prev, pager, next, jumper"
                                       @size-change="changeArticleSize"
                                       @current-change="changeArticleCurrent"
                                       style="float: right;margin-top: 10px;margin-bottom: 10px;" v-if="ewmList.length"></el-pagination>
                        <p class="text-center" style="font-size: 20px;" v-else>
                            暂无数据</p>
                    </div>

                    <!--赚金币-->
                    <div class="article_list" v-if="personTab === 'zjb'">
                        <el-select v-model="listName" placeholder="请选择栏目" @change="changeList" size="mini">
                            <el-option v-for="(item, index) in listNameList" :key="index" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                        <div class="wxq">
                            <div class="wxq_box" v-for="(item, index) in goldList" :key="index"
                                 @click="groupDetail(item.id)">
                                <div>
                                    <img :src="item.url">
                                </div>
                                <h5>{{ item.name }}</h5>
                                <p class="shadow" @click.stop="spread(item.id)">
                                    <el-button type="text">点击赚金币</el-button>
                                </p>
                            </div>
                        </div>
                        <el-pagination :current-page.sync="page.current"
                                       :page-size="page.articleSize"
                                       :total="page.articleTotal"
                                       background
                                       layout="total, prev, pager, next, jumper"
                                       @size-change="changeArticleSize"
                                       @current-change="changeArticleCurrent"
                                       style="float: right;margin-top: 10px;margin-bottom: 10px;" v-if="goldList.length"></el-pagination>
                        <p class="text-center" style="font-size: 20px;" v-else>
                            暂无数据</p>
                    </div>
                </div>

                <!--发布编辑-->
                <publish-box
                        v-if="defaultVal === 'wxq' || defaultVal === 'gzh' || defaultVal === 'gr' || defaultVal === 'qt'"
                        :types="defaultVal" @jump="getVal" :coin="coin">
                </publish-box>
                <!--发布文章-->
                <publish-article v-if="defaultVal === 'wz'" :coin="coin"></publish-article>
                <!--资料-->
                <profile-box v-if="defaultVal === 'zl'"></profile-box>
                <!--充值-->
                <recharge-box v-if="defaultVal === 'cz'"></recharge-box>
                <!--明细-->
                <record-box v-if="defaultVal === 'mx'"></record-box>
                <!--规则-->
                <rule-box v-if="defaultVal === 'gz'"></rule-box>
                <!--邀请推广-->
                <invite-box :is-show="invite" @toggle="toggleInvite" :codeId="codeId" :sectionId="sectionId"></invite-box>
            </el-col>
        </el-row>

        <el-dialog :visible.sync="spreadBox" width="25%">
            <img :src="spreadImg" alt="">
        </el-dialog>
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
    import avatar from '@/assets/images/avatar.jpg'
    // import moment from 'vue-moment'
    import inviteBox from '@/views/pc/person/invite'

    export default {
        name: "person",
        data() {
            return {
                avatar: avatar,
                userInfo: [
                    {title: '金币', num: 0},
                    {title: '发布', num: 0},
                    {title: '推广', num: 0},
                    {title: '文章', num: 0}
                ],
                defaultVal: '',
                contentList: [
                    {name: '发布微信群', value: 'wxq'},
                    {name: '发布公众号', value: 'gzh'},
                    {name: '发布个人微信', value: 'gr'},
                    {name: '发布文章', value: 'wz'},
                    {name: '发布其他', value: 'qt'}
                ],
                personList: [
                    {name: '修改资料', value: 'zl'},
                    {name: '我要充值', value: 'cz'},
                    {name: '明细纪录', value: 'mx'},
                    {name: '金币规则', value: 'gz'}
                ],
                defaultOpen: ['content', 'person'],
                personTab: 'fb',
                personTabList: [
                    {name: '发布', value: 'fb'},
                    {name: '推广', value: 'tg'},
                    {name: '文章', value: 'wz'},
                    {name: '赚金币', value: 'zjb'}
                ],
                articleList: [],
                page: {
                    current: 1,
                    size: 5,
                    articleSize: 10,
                    total: 0,
                    articleTotal: 0
                },
                listName: '',
                listNameList: [],
                ewmList: [],
                user: {
                    user: '',
                    coverUrl: ''
                },
                coin: 0,
                invite: false,
                codeId: 0,
                goldList: [],
                spreadImg: '',
                spreadBox: false,
                sectionId: ''
            }
        },
        created() {
            if (this.$route.query && this.$route.query.type) {
                this.defaultVal = this.$route.query.type
            }
            if (this.$route.query.tab) {
                switch (this.$route.query.tab) {
                    case '发布':
                        this.personTab = 'fb'
                        this.fetchPublish()
                        break
                    case '推广':
                        this.personTab = 'tg'
                        this.fetchSpread()
                        break
                    case '文章':
                        this.personTab = 'wz'
                        this.fetchArticle()
                        break
                    case '赚金币':
                        this.personTab = 'zjb'
                        this.fetchGold()
                        break
                    // no default
                }
            }
            this.fetchData()
            this.fetchTabs()
            this.fetchPublish()
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('popstate', () => {
                    if (this.$route.query.type) {
                        this.defaultVal = this.$route.query.type
                    } else {
                        this.defaultVal = ''
                    }
                    if (this.$route.query.tab) {
                        switch (this.$route.query.tab) {
                            case '发布':
                                this.personTab = 'fb'
                                this.fetchPublish()
                                break
                            case '推广':
                                this.personTab = 'tg'
                                this.fetchSpread()
                                break
                            case '文章':
                                this.personTab = 'wz'
                                this.fetchArticle()
                                break
                            case '赚金币':
                                this.personTab = 'zjb'
                                this.fetchGold()
                                break
                            // no default
                        }
                    }
                })
            })
        },
        methods: {
            // 初始化数据
            fetchData() {
                this.$api.getUserInfo().then((res) => {
                    if (res) {
                        this.user = res.user
                    }
                })
                // 获取个人中心信息
               this.$api.getBuzzInfo().then((res) => {
                   if (res) {
                       this.userInfo[0].num = res.coin
                       this.userInfo[1].num = res.publish
                       this.userInfo[2].num = res.popularize
                       this.userInfo[3].num = res.article
                   }
               })
            },
            fetchTabs() {
                this.$api.getTrade().then((res) => {
                    this.listNameList = res.data
                })
            },
            // 获取发布列表
            fetchPublish() {
                this.$api.getPublishBySectionId({
                    sectionId: this.listName,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.total = res.info.total
                        this.articleList = res.info.list
                        this.articleList.forEach((value, index, arr) => {
                            this.listNameList.forEach((data) => {
                                if (value.sectionId === data.id) {
                                    arr[index].section = data.name
                                }
                            })
                        })
                    }
                })
            },
            // 赚金币
            fetchGold() {
                this.$api.getEarnedPublishBySectionId({
                    sectionId: this.listName,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.articleTotal = res.info.total
                        this.goldList = res.info.list
//                        console.log(this.goldList)
                        this.goldList.forEach((value, index, arr) => {
                            this.listNameList.forEach((data) => {
                                if (value.sectionId === data.id) {
                                    arr[index].section = data.name
                                }
                            })
                        })
                    }
                })
            },
            // 筛选首页文章
            changePersonTab(val) {
                this.listName = ''
                this.page.current = 1
                switch (val) {
                    case 'fb':
                        this.fetchPublish()
                        this.$router.replace({
                            path: this.$route.path,
                            query: {
                                tab: '发布'
                            }
                        })
                        break
                    case 'tg':
                        this.fetchSpread()
                        this.$router.replace({
                            path: this.$route.path,
                            query: {
                                tab: '推广'
                            }
                        })
                        break
                    case 'wz':
                        this.fetchArticle()
                        this.$router.replace({
                            path: this.$route.path,
                            query: {
                                tab: '文章'
                            }
                        })
                        break
                    case 'zjb':
                        this.fetchGold()
                        this.$router.replace({
                            path: this.$route.path,
                            query: {
                                tab: '赚金币'
                            }
                        })
                        break
                    // no default
                }
            },
            // 文章详情
            articleDetail(data) {
                switch (this.personTab) {
                    case 'fb':
                        this.$router.push(`/group/${data.id}`)
                        break
                    case 'tg':
                        this.$router.push(`/group/${data.popOriginalId}`)
                        break
                    case 'wz':
                        this.$router.push(`/article/${data.id}`)
                        break
                    case 'zjb':
                        this.$router.push(`/article/${data.id}`)
                        break
                    // no default
                }

            },
            // 修改文章每页展示的条数
            changeSize(val) {
                this.page.size = val
                if (this.$route.query.tab) {
                    switch (this.$route.query.tab) {
                        case '发布':
                            this.personTab = 'fb'
                            this.fetchPublish()
                            break
                        case '文章':
                            this.personTab = 'wz'
                            this.fetchArticle()
                            break
                        // no default
                    }
                } else {
                    this.personTab = 'fb'
                    this.fetchPublish()
                }
            },
            // 修改文章页数
            changePage(val) {
                this.page.current = val
                if (this.$route.query.tab) {
                    switch (this.$route.query.tab) {
                        case '发布':
                            this.personTab = 'fb'
                            this.fetchPublish()
                            break
                        case '文章':
                            this.personTab = 'wz'
                            this.fetchArticle()
                            break
                        // no default
                    }
                } else {
                    this.personTab = 'fb'
                    this.fetchPublish()
                }
            },
            // 删除推广文章
            delArticle(data) {
                this.$confirm('确定删除此推广文章？')
                    .then(() => {
                        this.$api.deleteArticle({
                            id: data.id
                        }).then((res) => {
                            if (res) {
                                this.$message.success('删除成功')
                                this.fetchSpread()
                            }
                        })
                    })
            },
            // 修改文章每页展示的条数
            changeArticleSize(val) {
                this.page.articleSize = val
                if (this.$route.query.tab) {
                    switch (this.$route.query.tab) {
                        case '推广':
                            this.personTab = 'tg'
                            this.fetchSpread()
                            break
                        case '赚金币':
                            this.personTab = 'zjb'
                            this.fetchGold()
                            break
                        // no default
                    }
                }
            },
            // 修改文章页数
            changeArticleCurrent(val) {
                this.page.current = val
                if (this.$route.query.tab) {
                    switch (this.$route.query.tab) {
                        case '推广':
                            this.personTab = 'tg'
                            this.fetchSpread()
                            break
                        case '赚金币':
                            this.personTab = 'zjb'
                            this.fetchGold()
                            break
                        // no default
                    }
                }
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
                this.coin = this.userInfo[0].num
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        title: obj.length > 0 ? obj[0].name : obj1[0].name,
                        type: this.defaultVal
                    }
                })
            },
            getVal(obj) {
                this.defaultVal = obj.type
            },
            // 编辑
            edit(data) {
                // const obj = this.contentList.filter((value) => {
                //     return value.name.includes(data.section)
                // })
                // console.log(obj)
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        // title: this.personTab === 'fb' ? `编辑${data.section}` : '编辑文章',
                        // type: obj.length > 0 ? obj[0].value : 'wz',
                        title: '编辑文章',
                        type: 'wz',
                        id: data.id
                    }
                })
                this.defaultVal = 'wz'
                // if (obj.length) {
                //     this.defaultVal = obj[0].value
                // } else {
                //     this.defaultVal = 'wz'
                // }
            },
            // 删除
            del(id) {
                this.$confirm('确定删除？')
                    .then(() => {
                        this.$api.deleteArticle({
                            id: id
                        }).then((res) => {
                            if (res) {
                                this.$message.success('删除成功')
                                if (this.personTab === 'fb')
                                    this.fetchPublish()
                                else
                                    this.fetchArticle()
                            }
                        })
                    })
            },
            // 修改栏目
            changeList(val) {
                this.listName = val
                switch (this.personTab) {
                    case 'fb':
                        this.fetchPublish()
                        break
                    case 'tg':
                        this.fetchSpread()
                        break
                    case 'wz':
                        this.fetchArticle()
                        break
                    // no default
                }
            },
            // 推广列表
            fetchSpread() {
                this.$api.getPopularizeBySectionId({
                    sectionId: this.listName,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                        this.page.articleTotal = res.info.total
                        this.ewmList = res.info.list
                    }
                })
            },
            // 文章列表
            fetchArticle() {
                this.$api.getArticleDetail({
                    sectionId: this.listName,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                }).then((res) => {
                    if (res) {
                            this.page.total = res.info.total
                        this.articleList = res.info.list
                        this.articleList.forEach((value, index, arr) => {
                            this.listNameList.forEach((data) => {
                                if (value.sectionId === data.id) {
                                    arr[index].section = data.name
                                }
                            })
                        })
                    }
                })
            },
            // 邀请推广
            inviteSpread(data) {
                this.invite = true
                this.codeId = data.id
                this.sectionId = String(data.sectionId)
            },
            toggleInvite(val) {
                return val ? this.invite = true : this.invite = false
            },
            selectIndexTab(data) {
                if (data.title !== '金币') {
                    this.$router.push({
                        path: this.$route.path,
                        query: {
                            tab: data.title
                        }
                    })
                    this.defaultVal = ''
                    switch (data.title) {
                        case '发布':
                            this.personTab = 'fb'
                            this.fetchPublish()
                            break
                        case '推广':
                            this.personTab = 'tg'
                            this.fetchSpread()
                            break
                        case '文章':
                            this.personTab = 'wz'
                            this.fetchArticle()
                            break
                        // no default
                    }
                }
            },
            // 赚金币
            spread(id) {
                this.$api.popularize({
                    codeId: id
                }).then((res) => {
                    if (res) {
                        this.spreadImg = res.url
                        setTimeout(() => {
                            this.spreadBox = true
                        }, 300)
                    }
                })
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
            ruleBox,
            inviteBox
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
            cursor: pointer;

            span {
                font-size: 24px;
                font-weight: bold;
            }
            p {
                font-size: 16px;
            }
            &:hover{
                color: #fb6969;
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
                flex: 0 0 100px;

                img {
                    width: 100px;
                }
            }
            .article_info {
                margin-left: 10px;
                /*width: 300px;*/
                position: relative;
                width: 80%;

                h3 {
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
                p{
                    display: inline-block;
                    margin-bottom: 20px;
                    line-height: 30px;
                }
                .article_info_detail {
                    font-size: 13px;
                    position: absolute;
                    bottom: 0;

                    span {
                        margin-right: 10px;
                    }
                    .iconai-eye {
                        color: #ccc;
                        position: relative;
                        top: 2px;
                    }
                }
            }
            .share {
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
            position: relative;

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
            span {
                color: #888;
                font-size: 12px;
                margin-top: 5px;
                display: inline-block;
                width: 100%;
            }
        }
    }

    .spread_img{
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-top: 70px solid #ff7a4a;
        border-right: 70px solid transparent;
    }
    .spread_text{
        position: absolute;
        top: 8px;
        left: 5px;
        color: #fff;
        text-align: left;
        border-radius: 8px;
    }
    .shadow{
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: rgba(#000, .7);
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        cursor: pointer;

        .el-button{
            color: #fff;
            padding: 0;
        }
    }
</style>