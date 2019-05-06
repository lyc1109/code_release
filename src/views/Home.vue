<template>
    <div class="home">
        <div class="header">
            <div class="logo">微信群</div>
            <div class="all_search">
                <el-input v-model="allSearch" placeholder="请输入关键字搜索" @keypress.native="search">
                    <el-select slot="prepend" v-model="typeVal" placeholder="请选择类型" @change="changeType" style="width: 90px;">
                        <el-option v-for="(item, index) in typeList" :key="index" :label="item.name" :value="item.value"></el-option>
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
            <el-menu :default-active="activeNav" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="selectNav">
                <el-menu-item v-for="(item, index) in tabList" :key="index" :index="index + 1">{{ item.name }}</el-menu-item>
            </el-menu>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
                allSearch: '',
                typeVal: 'qun',
                typeList: [
                    { name: '微信群', value: 'qun' },
                    { name: '个人号', value: 'grh' },
                    { name: '公众号', value: 'gzh' }
                ],
                activeNav: '1',
                tabList: [
                    { name: '首页' },
                    { name: '微信群' },
                    { name: '地区微信' },
                    { name: '微商群' },
                    { name: '个人微信' },
                    { name: 'QQ群' },
                    { name: '短视频' },
                    { name: '小程序' },
                    { name: '网店' },
                    { name: '微信公众号' },
                    { name: '微信文章' },
                    { name: '红群' }
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
        .all_search{
            flex: 2;
        }
        .login_btn{
            flex: 1;
            text-align: right;

            .login_btn{
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
            .register_btn{
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                margin-left: 0;
            }
        }
    }
</style>
