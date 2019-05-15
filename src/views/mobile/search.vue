<template>
    <div>
        <header-box></header-box>
        <div>
            <div class="search_img">
                <span>微信群</span>
                <!--<img src="" alt="">-->
            </div>
            <van-search
                    v-model="search"
                    placeholder="请输入搜索关键词"
                    shape="round"
                    @search="searchs"
            >
            </van-search>
            <van-tabs v-model="result" class="result_tab" v-if="resultData.length > 0">
                <van-tab :title="`已为您找到${resultData.length}条结果`">
                    <!--微信群-->
                    <div class="wxq">
                        <div class="wxq_box" v-for="(item, index) in resultData" :key="index" @click="groupDetail(item.id)">
                            <div>
                                <img :src="item.url">
                            </div>
                            <span>{{ item.title }}</span>
                        </div>
                    </div>
                    <van-pagination
                            v-model="page.current"
                            :total-items="page.total"
                            mode="simple"
                            :items-per-page="page.size"
                            @change="changeSize(page.current)"
                    />
                </van-tab>
            </van-tabs>
        </div>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/mobile/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: "search",
        data() {
            return {
                result: 'result',
                search: '',
                resultData: [
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
                page: {
                    current: 1,
                    size: 5,
                    total: 0
                }
            }
        },
        methods: {
            fetchData() {},
            // 微信群详情
            groupDetail(id) {
                this.$router.push(`/group/${id}`)
            },
            searchs(search) {
                console.log(`搜索结果是：${search}`)
            },
            // 改变页码
            changeSize(val) {
                console.log(val)
                this.page.current = val
                this.fetchData()
            }
        },
        components: {
            headerBox,
            footerBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .search_img {
        text-align: center;
        margin: 3% 0;

        span {
            font-size: 2.4rem;
            font-weight: normal;
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
            margin-bottom: 10px;
            cursor: pointer;
            margin-right: 2%;

            &:hover {
                border-color: #3266cc;
            }

            & > last-child {
                margin-right: 0;
            }

            & > div {
                width: 90%;
                height: 0;
                padding: 5%;
                padding-bottom: 100%;
                position: relative;
                /*border: 1px solid #ddd;*/
                margin-right: 10px;
                border-radius: 8px;

                img {
                    width: 100%;
                    /*height: 100%;*/
                    /*position: absolute;*/
                    /*left: 10px;*/
                    /*width: 115px;*/
                    /*height: 115px;*/
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
            }
        }
    }
    .result_tab {
        /deep/.van-tabs__line {
            transform: none!important;
        }

        /deep/.van-tab {
            text-align: left;
        }
    }
</style>