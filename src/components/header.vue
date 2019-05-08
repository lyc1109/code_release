<template>
    <header>
        <div class="logo">微信群</div>
        <div class="all_search">
            <el-input v-model="allSearch" placeholder="请输入关键字搜索" @keypress.native="search">
                <!--                        <el-select slot="prepend" v-model="typeVal" placeholder="请选择类型" @change="changeType"-->
                <!--                                   style="width: 90px;">-->
                <!--                            <el-option v-for="(item, index) in typeList" :key="index" :label="item.name"-->
                <!--                                       :value="item.value"></el-option>-->
                <!--                        </el-select>-->
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>
        <!--栏目-->
        <nav style="margin: 0 5px;">
            <el-menu :default-active="activeNav"
                     mode="horizontal"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     @select="selectNav" router>
                <el-menu-item v-for="(item, index) in tabList" :key="index" :index="item.url">{{ item.name }}</el-menu-item>
            </el-menu>
        </nav>
        <div class="login_btn" v-if="isLogin">
            <el-button class="login_btn" @click="login">登录</el-button>
            <el-button class="register_btn" @click="register">注册</el-button>
        </div>
        <div class="logined_btn" v-else>
            <el-button class="login_btn">个人中心</el-button>
            <el-button class="register_btn">退出</el-button>
        </div>

        <!--        登录-->
        <login :is-show="showLogin" @toggle="toggleLogin" :type="loginType" :title="loginTit"></login>
    </header>
</template>

<script>
    import login from '@/views/login/login'

    export default {
        name: 'HelloWorld',
        props: {
            actived: {
                type: String,
                default: '/'
            }
        },
        data() {
            return {
                allSearch: '',
                activeNav: this.actived,
                tabList: [
                    {name: '首页', url: '/'},
                    {name: '微信文章', url: '/article'},
                    {name: '地区微信', url: '/area'},
                    {name: '微信公众', url: '/public'},
                    {name: '个人微信', url: '/person'},
                    // {name: 'QQ群'},
                    // {name: '短视频'},
                    // {name: '小程序'},
                    // {name: '网店'},
                    // {name: '微信公众号'},
                    // {name: '微信文章'},
                    // {name: '红群'}
                ],
                isLogin: true,
                showLogin: false,
                loginType: '',
                loginTit: ''
            }
        },
        watch: {
            actived(val) {
                this.activeNav = val
            }
        },
        methods: {
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

    .el-menu--horizontal {
        border-radius: 5px;

        .el-menu-item {
            height: 40px;
            line-height: 40px;
        }
    }
</style>
