<template>
    <div class="home">
        <header-box actived="/article"></header-box>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="{ path: item.url }">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="group_main flex">
            <div class="group_left">
                <el-button-group>
                    <el-button :type="item.btnType" v-for="(item, index) in btnList" :key="index" @click="changeType(item)">{{ item.name }}</el-button>
                </el-button-group>
                <div class="type_img">
                    <img src="https://img8.souweixin.com/20190504/1309613/fc9d6cfdbf6c38769d320924235572a7.jpeg" alt="" v-if="btnType === 'qz'">
                    <img src="https://img8.souweixin.com/20190504/1309613/65742e2498d88b2b46c142b17f64a0f7.png?h=500&w=260" alt="" v-if="btnType === 'q'">
                </div>
            </div>
            <div class="main_group">
                <h3>{{ groupData.name }}</h3>
                <p>{{ groupData.desc }}</p>
                <div class="main_group_info flex">
                    <div class="main_group_info_left">
                        <i class="iconfont"></i>
                        <span>行业：</span>
                        <span>{{ groupData.trade }}</span>
                    </div>
                    <div class="main_group_info_right">
                        <i class="iconfont"></i>
                        <span>地区：</span>
                        <span>{{ groupData.area }}</span>
                    </div>
                </div>
                <div class="main_group_info flex">
                    <div class="main_group_info_left">
                        <i class="iconfont"></i>
                        <span>时间：</span>
                        <span>{{ groupData.created }}</span>
                    </div>
                    <div class="main_group_info_right">
                        <i class="iconfont"></i>
                        <span>标签：</span>
                        <span>{{ groupData.tag }}</span>
                    </div>
                </div>
                <div class="main_group_info flex">
                    <div class="main_group_info_left">
                        <i class="iconfont"></i>
                        <span>微信号：</span>
                        <span>{{ groupData.wechat }}</span>
                    </div>
                    <div class="main_group_info_right">
                        <i class="iconfont"></i>
                        <span>热度：</span>
                        <span>{{ groupData.hot }}</span>
                    </div>
                </div>
                <div class="main_group_action flex">
                    <div>
                        <div class="iconfont"></div>
                        <p>{{ groupData.like }}个赞</p>
                    </div>
                    <div>
                        <div class="iconfont"></div>
                        <p>{{ groupData.tread }}次踩</p>
                    </div>
                    <div>
                        <div class="iconfont"></div>
                        <p>分享</p>
                    </div>
                    <div>
                        <div class="iconfont"></div>
                        <p>手机端</p>
                    </div>
                </div>
            </div>
        </div>
        <footer-box style="margin-top: 20px;"></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/pc/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: "groupDetail",
        data() {
            return {
                btnList: [
                    { name: '群主微信号', btnType: 'primary' },
                    { name: '群二维码', btnType: '' }
                ],
                btnType: 'qz',
                groupData: {
                    name: '积分宝群',
                    desc: '积分宝项目交流群，分红//群',
                    trade: '创业群',
                    area: '广东',
                    created: '2019-05-08',
                    tag: '积分宝',
                    wechat: 'nmd22288',
                    hot: '3002',
                    like: 2,
                    tread: 1
                },
                breadList: [
                    { name: '首页', url: '/' },
                    { name: '微信群', url: '/' },
                    { name: '创业群', url: '/' },
                    { name: '积分宝群', url: this.$route.path }
                ]
            }
        },
        methods: {
            changeType(data) {
                this.btnList.forEach((value) => {
                    value.btnType = ''
                })
                data.btnType = 'primary'
                return data.name.includes('群主') ? this.btnType = 'qz' : this.btnType = 'q'
            }
        },
        components: {
            headerBox,
            footerBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .group_main{
        margin-top: 20px;

        .group_left{
            text-align: center;
            flex: 1;

            .type_img{
                margin-top: 10px;

                img{
                    width: 225px;
                }
            }
        }
        .main_group{
            flex: 2;

            h3{
                text-align: center;
                border-bottom: 1px dashed #eee;
                line-height: 40px;
            }
            &>p{
                font-size: 14px;
                font-weight: 400;
                /*text-align: center;*/
                margin-bottom: 20px;
            }
            .main_group_info{
                .main_group_info_left, .main_group_info_right{
                    flex: 1;
                    line-height: 30px;
                    padding-left: 50px;
                }
            }
            .main_group_action{
                margin: 10px 0;
                justify-content: center;

                &>div{
                    margin: 0 10px;
                }
            }
        }
    }
</style>