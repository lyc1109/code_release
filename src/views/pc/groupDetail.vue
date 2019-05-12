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
                        <i class="iconfont iconsuozaixingye"></i>
                        <span>行业：</span>
                        <span>{{ groupData.trade }}</span>
                    </div>
                    <div class="main_group_info_right">
                        <i class="iconfont icondingwei"></i>
                        <span>地区：</span>
                        <span>{{ groupData.area }}</span>
                    </div>
                </div>
                <div class="main_group_info flex">
                    <div class="main_group_info_left">
                        <i class="iconfont iconshouji"></i>
                        <span>手机：</span>
                        <span>{{ groupData.mobile }}</span>
                    </div>
                    <div class="main_group_info_right">
                        <i class="iconfont iconshijian"></i>
                        <span>时间：</span>
                        <span>{{ groupData.created }}</span>
                    </div>
                </div>
                <div class="main_group_action flex">
                    <div>
                        <div class="iconfont iconzan"></div>
                        <p>{{ groupData.like }}个赞</p>
                    </div>
                    <div>
                        <div class="iconfont iconzizhutuiguang"></div>
                        <p>{{ groupData.tread }}次推广</p>
                    </div>
                    <div>
                        <div class="iconfont iconshouji"></div>
                        <p>手机端</p>
                    </div>
                </div>
            </div>
        </div>

        <!--热门微信群-->
        <el-tabs v-model="hotGroup">
            <el-tab-pane label="热门微信群" name="hot">
                <div class="wxq">
                    <div class="wxq_box" v-for="(item, index) in ewmList" :key="index" @click="groupDetail(item.id)">
                        <div>
                            <img :src="item.url">
                        </div>
                        <span>{{ item.title }}</span>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
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
                hotGroup: 'hot'
            }
        },
        methods: {
            changeType(data) {
                this.btnList.forEach((value) => {
                    value.btnType = ''
                })
                data.btnType = 'primary'
                return data.name.includes('群主') ? this.btnType = 'qz' : this.btnType = 'q'
            },
            // 微信群详情
            groupDetail(id) {
                this.$router.push(`/group/${id}`)
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
            /*text-align: center;*/
            flex: 0.6;

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
                /*text-align: center;*/
                border-bottom: 1px dashed #eee;
                line-height: 40px;
                font-size: 24px;
            }
            &>p{
                font-size: 14px;
                font-weight: 400;
                /*text-align: center;*/
                margin-bottom: 20px;
            }
            .main_group_info{
                &:nth-child(3){
                    margin-bottom: 10px;
                }
                .main_group_info_left, .main_group_info_right{
                    flex: 1;
                    line-height: 30px;
                    /*padding-left: 50px;*/

                    .iconfont{
                        margin-right: 8px;
                    }
                }

                .iconsuozaixingye{
                    color: #4ac14a;
                }
                .icondingwei{
                    color: #d42e2e;
                }
                .iconshouji{
                    color: #2380e0;
                }
                .iconshijian{
                    color: #f3cb5b;
                }
            }
            .main_group_action{
                margin: 10px 0;
                padding: 5% 15%;
                /*justify-content: center;*/

                &>div{
                    margin: 0 30px;

                    .iconfont{
                        font-size: 36px;
                        color: #ff3265;
                    }
                    p{
                        margin-top: 10px;
                    }
                }
            }
        }
    }
    .wxq {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .wxq_box {
            width: 10.985%;
            text-align: center;
            box-sizing: border-box;
            margin-right: 5%;
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
</style>