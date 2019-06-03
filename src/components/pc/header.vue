<template>
    <div>
        <header>
            <div class="logo" @click="toHome">微群发布</div>
            <div class="all_search">
                <el-input v-model="allSearch" placeholder="请输入关键字搜索" @keypress.native="search(allSearch)">
                    <!--                        <el-select slot="prepend" v-model="typeVal" placeholder="请选择类型" @change="changeType"-->
                    <!--                                   style="width: 90px;">-->
                    <!--                            <el-option v-for="(item, index) in typeList" :key="index" :label="item.name"-->
                    <!--                                       :value="item.value"></el-option>-->
                    <!--                        </el-select>-->
                    <el-button slot="append" icon="el-icon-search" @click="search(allSearch)"></el-button>
                </el-input>
            </div>
            <!--栏目-->
            <!--<nav style="margin: 0 5px;" v-if="!isList">-->
                <!--<el-menu :default-active="activeNav"-->
                         <!--mode="horizontal"-->
                         <!--background-color="#545c64"-->
                         <!--text-color="#fff"-->
                         <!--active-text-color="#ffd04b"-->
                         <!--@select="selectNav" router>-->
                    <!--<el-menu-item v-for="(item, index) in tabList" :key="index"-->
                                  <!--:index="`/list?id=${item.id}`">{{ item.name }}-->
                    <!--</el-menu-item>-->
                <!--</el-menu>-->
            <!--</nav>-->
            <div class="login_btn" v-if="isLogin">
                <el-button class="login_btn" @click="login">登录</el-button>
                <el-button class="register_btn" @click="register">注册</el-button>
            </div>
            <div class="logined_btn" v-else>
                <!--{{ username }}-->
                <el-button class="checkin_btn" @click="checkIn">签到</el-button>
                <el-button class="login_btn" @click="toPerson">个人中心</el-button>
                <el-button class="register_btn" @click="quit">退出</el-button>
            </div>


            <!--        登录-->
            <login :is-show="showLogin" @toggle="toggleLogin" :type="loginType" :title="loginTit"
                   @success="successLogin"></login>
        </header>

        <!--栏目-->
        <nav style="margin: 20px 5px 0;">
            <el-menu :default-active="activeNav"
                     mode="horizontal"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     @select="selectNav">
                <el-menu-item v-for="(item, index) in tabList" :key="index"
                              :index="String(item.id)">{{ item.name }}
                </el-menu-item>
            </el-menu>
        </nav>
    </div>
</template>

<script>
    import login from '@/views/pc/login/login'

    export default {
        name: 'HelloWorld',
        props: {
            actived: {
                type: String,
                default: '/'
            },
            type: {
                type: String,
                default: 'basic'
            },
            id: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                allSearch: '',
                activeNav: '',
                tabList: [],
                personTabList: [
                    {name: '个人中心', url: '/person'},
                    {name: '网站首页', url: '/'}
                ],
                isLogin: true,
                showLogin: false,
                loginType: '',
                loginTit: '',
                username: '',
                sectionId: this.id
            }
        },
        watch: {
            actived(val) {
                this.activeNav = val
            },
            id(val) {
                this.sectionId = val
                if (this.sectionId !== '') {
                    this.activeNav = String(this.id)
                }
            }
        },
        mounted() {
            this.fetchData()
            this.fetchTabs()
            if (this.$route.fullPath.includes('/list?id=')) {
                this.activeNav = String(this.$route.query.id)
            } else if (this.$route.path === '/home') {
                this.activeNav = '/'
            }
        },
        methods: {
            fetchData() {
                const token = sessionStorage.getItem('user')
                if (token && token != null && token != '') {
                    this.isLogin = false
                } else {
                    this.isLogin = true
                }

                if (this.$route.query.id && this.$route.query.id !== '') {
                    this.activeNav = `list?id=${this.$route.query.id}`
                }
                // https.getUserInfo().then((res) => {
                //     console.log(res)
                // })
            },
            // 初始化tabs
            fetchTabs() {
                this.$api.getTradeList().then((res) => {
                    this.tabList = res.data
                    this.tabList.unshift({
                        name: '首页',
                        id: '/'
                    })
                })
            },
            // 搜索
            search(val) {
                this.$router.push({
                    path: '/search',
                    query: {
                        result: val
                    }
                })
            },
            // 修改搜索类型
            changeType(val) {
                console.log(val)
            },
            // 修改tab
            selectNav(val) {
                if (val === '/') {
                    this.$router.push('/')
                } else {
                    this.$router.push({
                        path: '/list',
                        query: {
                            id: val
                        }
                    })
                }
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
            },
            // 控制登录显示隐藏
            toggleLogin(val) {
                return val ? this.showLogin = true : this.showLogin = false
            },
            // 个人中心
            toPerson() {
                this.$router.push(`/person`)
            },
            // 退出
            quit() {
                this.$confirm('确定退出吗？')
                    .then(() => {
                        this.$api.logout().then((res) => {
                            if (res) {
                                this.isLogin = false
                                setTimeout(() => {
                                    this.$router.go(0)
                                }, 1000)
                                sessionStorage.removeItem('user')
                                this.$message.success('已退出登录')
                            }
                        })
                    })
            },
            // 登录成功
            successLogin(val) {
                setTimeout(() => {
                    this.$router.go(0)
                }, 1000)
                this.showLogin = false
            },
            // 跳转至首页
            toHome() {
                this.$router.push('/')
            },
            // 签到
            checkIn() {
                this.$api.checkin().then((res) => {
                    if (res) {
                        this.$message.success('签到成功')
                    }
                })
            }
        },
        components: {
            login
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    header {
        display: flex;

        .logo {
            color: #333;
            font-size: 24px;
            flex: 0.7;
        }

        .all_search {
            flex: 2;
        }

        .login_btn, .logined_btn {
            flex: 1.2;
            text-align: right;

            .login_btn {
                border-radius: 0;
                margin-left: 0;
                border-right: 0 none;
            }

            .register_btn {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                margin-left: 0;
            }
            .checkin_btn{
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                margin-left: 0;
            }
        }
    }

    .el-menu--horizontal {
        border-radius: 5px;

        .el-menu-item {
            height: 40px;
            line-height: 40px;
        }
    }
</style>
