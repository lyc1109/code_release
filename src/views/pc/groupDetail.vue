<template>
    <div class="home">
        <header-box actived="/article" :id="String(groupData.sectionId)"></header-box>
        <!--        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">-->
        <!--            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="{ path: item.url }">{{ item.name }}</el-breadcrumb-item>-->
        <!--        </el-breadcrumb>-->
        <div class="group_main flex">
            <div class="group_left">
                <el-button-group v-if="groupData.imgUrl2">
                    <el-button :type="item.btnType" v-for="(item, index) in btnList" :key="index"
                               @click="changeType(item)">{{ item.name }}
                    </el-button>
                </el-button-group>
                <div class="type_img">
                    <img :src="groupData.imgUrl2" alt="" v-if="groupData.imgUrl2 && btnType === 'qz'">
                    <img :src="groupData.imgUrl1" alt="" v-if="btnType === 'q'">
                </div>
            </div>
            <div class="main_group">
                <h3>{{ groupData.name }}</h3>
                <p>{{ groupData.description }}</p>
                <div class="main_group_info">
                    <div class="main_group_info_left">
                        <i class="iconfont iconsuozaixingye"></i>
                        <span>行业：</span>
                        <el-tag size="mini">{{ section }}</el-tag>
                    </div>
                    <div class="main_group_info_left">
                        <i class="iconfont icondingwei"></i>
                        <span>地区：</span>
                        <el-tag size="mini">{{ groupData.position1 + groupData.position2 }}</el-tag>
                    </div>
                </div>
                <div class="main_group_info flex">
<!--                    <div class="main_group_info_left">-->
<!--                        <i class="iconfont iconredu"></i>-->
<!--                        <span>热度：</span>-->
<!--                        <span>{{ groupData.mobile }}</span>-->
<!--                    </div>-->
                    <div class="main_group_info_right">
                        <i class="iconfont iconshijian"></i>
                        <span>时间：</span>
                        <span>{{ groupData.createTime }}</span>
                    </div>
                </div>
                <div class="main_group_action flex">
                    <div @click="toLike">
                        <div class="iconfont iconzan"></div>
                        <p>{{ groupData.star }}个赞</p>
                    </div>
<!--                    <div>-->
<!--                        <div class="iconfont iconredu"></div>-->
<!--                        <p>热度{{ groupData.hot }}</p>-->
<!--                    </div>-->
                    <div>
                        <div class="iconfont iconzizhutuiguang"></div>
                        <p>{{ groupData.typ }}次推广</p>
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
            <el-tab-pane label="热门" name="hot">
                <div class="wxq">
                    <div class="wxq_box" v-for="(item, index) in ewmList" :key="index" @click="groupDetail(item.id)" v-if="item.modelType !== 2">
                        <div>
                            <img :src="item.url">
                        </div>
                        <span>{{ item.name }}</span>
                        <p style="text-align: left;padding-left: 5px;"
                           v-if="(new Date() - new Date(item.lastRefreshTime)) < 1000*3600">
                            {{ moment().diff(moment(item.lastRefreshTime), 'minute') }}分钟前更新
                        </p>
                        <p style="text-align: left;padding-left: 5px;"
                           v-if="(new Date() - new Date(item.lastRefreshTime)) < 1000*3600*24 && (new Date() - new Date(item.lastRefreshTime)) > 1000*3600">
                            {{ moment().diff(moment(item.lastRefreshTime), 'hour') }}小时前更新
                        </p>
                        <p style="text-align: left;padding-left: 5px;"
                           v-if="(new Date() - new Date(item.lastRefreshTime)) >= 1000*3600*24">
                            {{ moment().diff(moment(item.lastRefreshTime), 'day') }}天前更新
                        </p>
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
                    {name: '群主二维码', btnType: 'primary'},
                    {name: '群二维码', btnType: ''}
                ],
                btnType: 'qz',
                groupData: {
                    name: '积分宝群',
                    description: '积分宝项目交流群，分红//群',
                    sectionId: '',
                    area: '',
                    createTime: '',
                    wechat: 'nmd22288',
                    hot: 0,
                    star: 0,
                    typ: 0,
                    mobile: 13522223333,
                    position1: '',
                    position2: '',
                    ownerWechat: '',
                    imgUrl1: '',
                    section: ''
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
        watch: {
            '$route' (to, from) {
                this.fetchData()
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
                    pageSize: 48
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
                            this.btnType = 'q'
                        else
                            this.btnType = 'qz'
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
                this.fetchData()
                this.$forceUpdate()
            },
            // 点赞
            toLike() {
                this.$api.getStar({
                    id: this.$route.params.id
                }).then((res) => {
                    if (res) {
                        this.groupData.star++
                        this.$message.success('点赞成功')
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
    .group_main {
        margin-top: 20px;

        .group_left {
            /*text-align: center;*/
            flex: 0.6;

            .type_img {
                margin-top: 10px;

                img {
                    width: 225px;
                }
            }
        }

        .main_group {
            flex: 2;

            h3 {
                /*text-align: center;*/
                border-bottom: 1px dashed #eee;
                line-height: 40px;
                font-size: 24px;
            }

            & > p {
                font-size: 14px;
                font-weight: 400;
                /*text-align: center;*/
                margin-bottom: 20px;
            }

            .main_group_info {
                &:nth-child(3) {
                    margin-bottom: 10px;
                }

                .main_group_info_left, .main_group_info_right {
                    flex: 1;
                    line-height: 30px;
                    /*padding-left: 50px;*/

                    .iconfont {
                        margin-right: 8px;
                        position: relative;
                        top: 2px;
                    }
                }

                .iconsuozaixingye {
                    color: #4ac14a;
                }

                .icondingwei {
                    color: #d42e2e;
                }

                .iconredu {
                    color: #2380e0;
                }

                .iconshijian {
                    color: #f3cb5b;
                }
            }

            .main_group_action {
                margin: 10px 0;
                padding: 5% 10%;
                /*justify-content: center;*/

                & > div {
                    margin: 0 30px;

                    .iconfont {
                        font-size: 36px;
                        color: #ff3265;
                    }

                    p {
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
                    width: 90%;
                    height: 90%;
                    /*width: 115px;*/
                    /*height: 115px;*/
                    position: absolute;
                    left: 5px;
                }
            }

            span {
                color: #555;
                font-size: 14px;
                margin-top: 8px;
                display: inline-block;
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: normal;
            }
            p{
                font-size: 12px;
                color: #aaa;
            }
        }
    }
</style>