<template>
    <div>
        <header-box :isShowNav="false"></header-box>
        <div class="group_detail_m">
            <h1>{{ groupData.name }}</h1>
            <p>{{ groupData.desc }}</p>
            <van-tabs v-model="btnType" type="card">
                <van-tab v-for="(item, index) in btnList" :key="index" :title="item.name"></van-tab>
            </van-tabs>
            <div class="type_img">
                <img src="https://img8.souweixin.com/20190504/1309613/fc9d6cfdbf6c38769d320924235572a7.jpeg" alt=""
                     v-if="btnType === 0">
                <img src="https://img8.souweixin.com/20190504/1309613/65742e2498d88b2b46c142b17f64a0f7.png?h=500&w=260"
                     alt="" v-if="btnType === 1">
            </div>
            <div class="group_detail_info_m">
                <div class="main_group_info">
                    <i class="iconfont iconsuozaixingye"></i>
                    <span>行业：</span>
                    <van-tag type="primary" size="medium">{{ groupData.trade }}</van-tag>
                </div>
                <div class="main_group_info">
                    <i class="iconfont icondingwei"></i>
                    <span>地区：</span>
                    <van-tag type="primary" size="medium">{{ groupData.area }}</van-tag>
                </div>
                <div class="main_group_info">
                    <i class="iconfont iconshouji"></i>
                    <span>手机：</span>
                    <span>{{ groupData.mobile }}</span>
                </div>
                <div class="main_group_info">
                    <i class="iconfont iconshijian"></i>
                    <span>时间：</span>
                    <span>{{ groupData.created }}</span>
                </div>
            </div>
            <div class="group_detail_operate_m">
                <div class="main_group_action flex">
                    <div>
                        <div class="iconfont iconzan"></div>
                        <p>{{ groupData.like }}个赞</p>
                    </div>
                    <div>
                        <div class="iconfont iconredu"></div>
                        <p>热度{{ groupData.hot }}</p>
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
        <!--微信文章-->
        <div class="article_index_title"><span>热门</span></div>
        <!--微信群-->
        <div class="article_index flex">
            <div class="article_index_list" v-for="(item, index) in ewmList" :key="index">
                <img :src="item.url" alt="">
                <p>{{ item.title }}</p>
            </div>
        </div>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/mobile/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: "groupDetail",
        data() {
            return {
                btnList: [
                    {name: '群主微信号', btnType: 'primary'},
                    {name: '群二维码', btnType: ''}
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
                    tread: 1,
                    mobile: 13522223333
                },
                breadList: [
                    {name: '首页', url: '/'},
                    {name: '微信群', url: '/'},
                    {name: '创业群', url: '/'},
                    {name: '积分宝群', url: this.$route.path}
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
    .group_detail_m{
        padding: 2%;

        .main_group_action{
            margin: 10px 0;
            padding: 2%;
            /*justify-content: center;*/

            &>div{
                margin: 0 2rem;

                .iconfont{
                    font-size: 3.6rem;
                    color: #ff3265;
                }
                p{
                    margin-top: 10px;
                }
            }
        }
        .group_detail_info_m{
            padding: 2% 5%;

            .main_group_info{
                line-height: 30px;

                .iconfont{
                    margin-right: 8px;
                    position: relative;
                    top: 2px;
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
        }
    }
    .type_img {
        margin-top: 10px;
        text-align: center;

        img {
            width: 80%;
        }
    }
    .wxq {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        margin-left: 2%;

        .wxq_box {
            width: 31.33%;
            text-align: center;
            box-sizing: border-box;
            margin-right: 2%;
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
    .article_index {
        flex-wrap: wrap;
        margin-top: 2rem;
        padding: 0 2%;

        .article_index_list {
            width: 31.33%;
            padding-right: 2%;
            text-align: center;

            img {
                width: 80%;
            }

            p {
                line-height: 25px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 25px;
            }
        }
    }
    .article_index_title{
        border-left: 4px solid #2ca0ff;
        border-bottom: 1px solid #ececec;
        line-height: 30px;
        margin-top: 2rem;

        span{
            margin-left: 10px;
            font-size: 1.6rem;
            color: #333;
        }
    }
</style>