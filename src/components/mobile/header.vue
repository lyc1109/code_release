<template>
    <div>
        <van-nav-bar class="m_header">
            <van-icon name="bars" slot="left" @click="showNav"></van-icon>
            <div class="m_logo" slot="title">
                <span>微信群</span>
                <!--<img src="" alt="">-->
            </div>
            <div slot="right">
                 <van-icon name="search" @click="search" />
                <van-icon name="user-circle-o" @click="isLogin ? person : login"></van-icon>
            </div>
        </van-nav-bar>
        <!--导航-->
        <div class="index_tab flex" v-if="isShowNav">
            <div class="index_tab_item" v-for="(item, index) in tabList" :key="index" @click="toList(item)">
                <i class="iconfont" :class="`icon-${item.icon}`" :style="{ color: item.color, borderColor: item.color }"></i>
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "header",
        props: {
            isShowNav: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                tabList: [
                    { name: '首页', icon: 'home', color: '#87cb4f' },
                    { name: '微信群', icon: 'group', color: '#8962bd' },
                    { name: '地区微信', icon: 'area', color: '#f84f9c' },
                    { name: '个人微信', icon: 'wechat', color: '#e77638' },
                    { name: '微信公众号', icon: 'publicNum', color: '#f94e4a' },
                    { name: '微信文章', icon: 'wenzhang', color: '#4e9cff' },
                    { name: '个人中心', icon: 'person', color: '#cf4eff' }
                ],
                isLogin: false,
            }
        },
        methods: {
            showNav() {
                this.isShowNav = !this.isShowNav
            },
            // 列表页
            toList(data) {
                this.$router.push('/list')
            },
            // 搜索页
            search() {
                this.$router.push('/search')
            },
            // 个人中心
            person() {
                this.$router.push('/person')
            },
            // 登录
            login() {
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .m_header{
        background: #555;
        color: #fff;

        .m_logo{
            text-align: center;

            span{
                font-size: 2.4rem;
                color: #fff;
                font-weight: normal;
            }
        }
        .van-icon{
            font-size: 2rem;
            color: #fff;

            &.van-icon-search{
                margin-right: .5rem;
            }
        }
    }
    .index_tab{
        flex-wrap: wrap;
        margin-top: 2rem;
        border-bottom: 1px solid #ececec;

        .index_tab_item{
            width: 25%;
            text-align: center;
            margin-bottom: 1rem;

            i{
                font-size: 3.4rem;
                border: 2px solid;
                border-radius: 50%;
                padding: .2rem;
            }
            p{
                font-size: 1.4rem;
                margin-top: .8rem;
                font-weight: normal;
                color: #555;
            }
            &:nth-child(4n){
                padding-right: 0;
            }
        }
    }
</style>