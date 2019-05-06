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
                <div class="login_btn">
                    <el-button type="primary" size="large" class="login_btn">登录</el-button>
                    <el-button size="large" class="register_btn">注册</el-button>
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
        </div>
        <!--底部-->
        <el-footer class="index_foot">
            Copyright © 2019 二维码发布
        </el-footer>
    </div>
</template>

<script>
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
                ]
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
            moreEWM() {
                this.$router.push('/')
            }
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
        .login_btn {
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

            &:hover{
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

    .index_foot {
        border-top: 1px solid #ddd;
        padding: 20px 0;
        text-align: center;
        font-size: 14px;
        color: #555;
    }
</style>
