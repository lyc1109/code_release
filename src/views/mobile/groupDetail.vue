<template>
    <div>
        <header-box :isShowNav="false"></header-box>
        <div class="group_detail_m">
            <h1>{{ groupData.name }}</h1>
            <p>{{ groupData.description }}</p>
            <van-tabs v-model="btnType" type="card" v-if="groupData.imgUrl2" @click="changeType(btnType)">
                <van-tab v-for="(item, index) in btnList" :key="index" :title="item.name"></van-tab>
            </van-tabs>
            <div class="type_img">
                <img :src="groupData.imgUrl2" alt="" v-if="groupData.imgUrl2 && btnType == 0">
                <img :src="groupData.imgUrl1" alt="" v-if="btnType == 1 && groupData.imgUrl1">
            </div>
            <div class="group_detail_info_m">
                <div class="main_group_info">
                    <i class="iconfont iconsuozaixingye"></i>
                    <span>行业：</span>
                    <van-tag type="primary" size="medium" v-if="section && section !== ''">{{ section }}</van-tag>
                    <span v-else>暂无行业</span>
                </div>
                <div class="main_group_info">
                    <i class="iconfont icondingwei"></i>
                    <span>地区：</span>
                    <van-tag type="primary" size="medium" v-if="groupData.position1 && (!groupData.position2 && !groupData.position3)">{{ groupData.position1 }}</van-tag>
                    <van-tag type="primary" size="medium" v-else-if="(groupData.position1 && groupData.position2) && !groupData.position3">{{ groupData.position1 + groupData.position2 }}</van-tag>
                    <van-tag type="primary" size="medium" v-else-if="groupData.position1 && groupData.position2 && groupData.position3">{{ groupData.position1 + groupData.position2 + groupData.position3 }}</van-tag>
                    <span v-else>暂无地区</span>
                </div>
                <div class="main_group_info">
                    <i class="iconfont iconshijian"></i>
                    <span>时间：</span>
                    <span v-if="groupData.createTime">{{ groupData.createTime }}</span>
                    <span v-else>暂无时间</span>
                </div>
            </div>
            <div class="group_detail_operate_m">
                <div class="main_group_action flex">
                    <div @click="toLike" style="cursor: pointer;">
                        <div class="iconfont iconzan"></div>
                        <p>{{ groupData.star }}个赞</p>
                    </div>
                    <div>
                        <div class="iconfont iconzizhutuiguang"></div>
                        <p>{{ groupData.typ }}次推广</p>
                    </div>
                </div>
            </div>
        </div>
        <!--微信文章-->
        <div class="article_index_title"><span>热门</span></div>
        <!--微信群-->
        <div class="article_index flex">
            <div class="article_index_list" v-for="(item, index) in ewmList" :key="index" @click="groupDetail(item.id)" style="cursor: pointer;">
                <img :src="item.imgUrl1" alt="">
                <p>{{ item.name }}</p>
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
                btnType: 0,
                groupData: {
                    name: '暂无名称',
                    description: '',
                    trade: '',
                    area: '',
                    created: '',
                    tag: '',
                    wechat: '',
                    hot: '',
                    like: 2,
                    tread: 1,
                    mobile: 13522223333,
                    star: 0,
                    typ: 0
                },
                breadList: [
                    {name: '首页', url: '/'},
                    {name: '微信群', url: '/'},
                    {name: '创业群', url: '/'},
                    {name: '积分宝群', url: this.$route.path}
                ],
                ewmList: [],
                hotGroup: 'hot',
                section: ''
            }
        },
        created() {
            this.fetchHostList()
            this.fetchData()
        },
        methods: {
            // 获取热门二维码
            fetchHostList() {
                const page = {
                    pageNum: 1,
                    pageSize: 15
                }
                this.$api.getTradeDetail(page).then((res) => {
                    this.ewmList = res.info.list
                })
            },
            // 获取二维码信息
            fetchData() {
                this.$api.getCodeDetail({
                    id: this.$route.params.id
                }).then((res) => {
                    if (res) {
                        this.groupData = res.info
                        if (!this.groupData.imgUrl2)
                            this.btnType = 1
                        else
                            this.btnType = 0
                    }
                })
                this.$api.getTradeList().then((res) => {
                    if (res && res.data.length) {
                        res.data.forEach((value) => {
                            if (value.id == this.groupData.sectionId) {
                                this.section = value.name
                            }
                        })
                    }
                })
            },
            changeType(val) {
                this.btnType = val
                // this.btnList.forEach((value) => {
                //     value.btnType = ''
                // })
                // data.btnType = 'primary'
                // return data.name.includes('群主') ? this.btnType = 'qz' : this.btnType = 'q'
            },
            // 微信群详情
            groupDetail(id) {
                this.$router.push(`/group/${id}`)
                this.fetchData()
                this.$forceUpdate()
            },
            // 点赞
            toLike() {
                this.$api.getStar({
                    id: this.$route.params.id
                }).then((res) => {
                    if (res.data) {
                        this.groupData.star = res.data
                        this.$message.success('点赞成功')
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        components: {
            headerBox,
            footerBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .not_show{
        display: none;
    }
    .group_detail_m{
        padding: 2%;

        .main_group_action{
            margin: 10px 0;
            padding: 2%;
            justify-content: center;

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