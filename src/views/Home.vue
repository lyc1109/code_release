<template>
    <div>
        <div class="home">
            <div class="header">
                <div class="logo">微信群</div>
                <div class="all_search">
                    <el-input v-model="allSearch" placeholder="请输入关键字搜索" @keypress.native="search">
                        <el-select slot="prepend" v-model="typeVal" placeholder="请选择类型" @change="changeType"
                                   style="width: 90px;">
                            <el-option v-for="(item, index) in typeList" :key="index" :label="item.name"
                                       :value="item.value"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </div>
                <div class="login_btn" v-if="isLogin">
                    <el-button class="login_btn" @click="login">登录</el-button>
                    <el-button class="register_btn" @click="register">注册</el-button>
                </div>
                <div class="logined_btn" v-else>
                    <el-button class="login_btn">个人中心</el-button>
                    <el-button class="register_btn">退出</el-button>
                </div>
            </div>
            <nav style="margin-top: 20px;">
                <el-menu :default-active="activeNav" mode="horizontal" background-color="#545c64" text-color="#fff"
                         active-text-color="#ffd04b" @select="selectNav">
                    <el-menu-item v-for="(item, index) in tabList" :key="index" :index="String(index + 1)">{{ item.name
                        }}
                    </el-menu-item>
                </el-menu>
            </nav>

            <div style="position: relative;margin-top: 20px;">
                <el-tabs v-model="tabVal" type="card" @tab-click="changeTab(tabVal)">
                    <el-tab-pane v-for="(item, index) in tabData" :key="index" :label="item.name"
                                 :name="item.value"></el-tab-pane>
                </el-tabs>
                <el-button type="text" style="position: absolute;margin-top: -50px;right: 20px;" @click="moreEWM">更多
                </el-button>

                <!--微信群-->
                <div class="wxq" v-if="tabVal === 'wxq'">
                    <div class="wxq_box" v-for="(item, index) in ewmList" :key="index">
                        <div>
                            <img :src="item.url">
                        </div>
                        <span>{{ item.title }}</span>
                    </div>
                </div>
            </div>

            <!-- 阅读推荐-->
            <article style="margin-top: 20px;">
                <el-tabs v-model="article" type="border-card" @tab-click="changeArticle(article)">
                    <el-tab-pane v-for="(item, index) in articleData" :key="index" :label="item.name"
                                 :name="item.value">
                        <!--文章-->
                        <div class="index_article">
                            <div class="article_list" v-for="(item, index) in articleList" :key="index">
                                <div class="article_img">
                                    <img :src="item.imgUrl" alt="">
                                </div>
                                <div class="article_info">
                                    <h3><el-button type="text">{{ item.title }}</el-button></h3>
                                    <p>{{ item.desc }}</p>
                                    <div class="article_info_detail">
                                        <span>发布时间：{{ item.created }}</span>
                                        <i class="iconai-eye iconfont"></i>
                                        <span style="margin-left: 5px;">{{ item.watchNum }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </article>
        </div>
        <!--底部-->
        <el-footer class="index_foot">
            Copyright © 2019 二维码发布
        </el-footer>

<!--        登录-->
        <login :is-show="showLogin" @toggle="toggleLogin" :type="loginType" :title="loginTit"></login>
    </div>
</template>

<script>
    import login from '@/views/login/login'

    export default {
        name: 'home',
        data() {
            return {
                allSearch: '',
                typeVal: 'qun',
                typeList: [
                    {name: '微信群', value: 'qun'},
                    {name: '个人号', value: 'grh'},
                    {name: '公众号', value: 'gzh'}
                ],
                activeNav: '1',
                tabList: [
                    {name: '首页'},
                    {name: '微信群'},
                    {name: '地区微信'},
                    {name: '微商群'},
                    {name: '个人微信'},
                    {name: 'QQ群'},
                    {name: '短视频'},
                    {name: '小程序'},
                    {name: '网店'},
                    {name: '微信公众号'},
                    {name: '微信文章'},
                    {name: '红群'}
                ],
                tabVal: 'wxq',
                tabData: [
                    {name: '微信群', value: 'wxq'},
                    {name: '公众号', value: 'gzh'},
                    {name: '个人微信', value: 'grwx'}
                ],
                ewmList: [
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20180930/1254434/84b86118f5223639ed26e8d394d1a559.png',
                        title: '手机端进入可快速扫码>>>'
                    },
                    {
                        url: 'https://img8.souweixin.com/20190216/981651/248d562f53ec2dc04a011a6841692a70.jpeg?h=116&w=116',
                        title: '手机端进入可快速扫码>>>'
                    }
                ],
                article: 'tj',
                articleData: [
                    {name: '阅读推荐', value: 'tj'},
                    {name: '微商杂谈', value: 'zt'},
                    {name: '养生之道', value: 'ys'}
                ],
                articleList: [
                    {
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    },
                    {
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    },
                    {
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    },
                    {
                        imgUrl: 'https://img8.souweixin.com/20190506/38/caac93e3dfe93e9c0d6ab4a38c2fe0be.jpeg',
                        title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                        desc: '孩子，当你再读一些书，再阅一些人，再经历一些事，你就会明白，一位眼中有光、灵魂有爱的老师会对你产生怎',
                        created: '2019-05-06',
                        watchNum: 700
                    }
                ],
                showLogin: false,
                loginType: '',
                isLogin: true
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            // 初始化数据
            fetchData() {
                console.log('初始化数据')
            },
            // 搜索
            search() {
                console.log('搜索')
            },
            // 修改搜索类型
            changeType(val) {
                console.log(val)
            },
            // 修改tab
            selectNav(val) {
                console.log(val)
            },
            // 切换正文tabs
            changeTab(val) {
                console.log(val)
            },
            // 更多微信群
            moreEWM() {
                this.$router.push('/')
            },
            // 跳转文章
            changeArticle(val) {
                console.log(val)
            },
            // 控制登录显示隐藏
            toggleLogin(val) {
                return val ? this.showLogin = true : this.showLogin = false
            },
            // 登录
            login() {
                this.loginTit = '登录'
                this.loginType = 'login'
                this.showLogin = true
            },
            // 注册
            register() {
                this.loginTit = '注册'
                this.loginType = 'register'
                this.showLogin = true
            }
        },
        components: {
            login
        }
    }
</script>
<style scoped lang="scss" type="text/scss">
    .home {
        width: 1024px;
        margin: 20px auto;
    }

    .header {
        display: flex;

        .logo {
            color: #333;
            font-size: 24px;
            flex: 1;
        }

        .all_search {
            flex: 2;
        }

        .login_btn, .logined_btn {
            flex: 1;
            text-align: right;

            .login_btn {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }

            .register_btn {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                margin-left: 0;
            }
        }
    }

    .wxq {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .wxq_box {
            width: 18.985%;
            border: 1px solid #ddd;
            text-align: center;
            padding: 5px 0;
            border-radius: 8px;
            box-sizing: border-box;
            margin-right: 10px;
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
                padding-bottom: 90%;
                position: relative;

                img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 10px;
                    /*width: 115px;*/
                    /*height: 115px;*/
                }
            }

            span {
                color: #555;
                font-size: 12px;
                margin-top: 8px;
                display: inline-block;
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .index_article {
        /*padding: 20px;*/
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .article_list {
            width: 50%;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            display: flex;
            padding: 10px;

            &:nth-child(even) {
                border-right: 0 none;
            }
            &:nth-child(odd) {
                padding-left: 0;
            }

            .article_img {
                flex: 0 0 180px;

                img {
                    width: 180px;
                }
            }
            .article_info{
                margin-left: 10px;
                width: 300px;
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
        }
    }

    .index_foot {
        border-top: 1px solid #ddd;
        padding: 20px 0;
        text-align: center;
        font-size: 14px;
        color: #555;
    }
</style>
