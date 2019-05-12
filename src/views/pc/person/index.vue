<template>
    <div class="home">
        <header-box actived="/person" type="person"></header-box>
        <el-row class="article_main">
            <el-col :span="6" :offset="1">
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
            <el-col :span="18">
                
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
                defaultOpen: [ 'content', 'person' ]
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
</style>