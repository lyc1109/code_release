<template>
    <div>
        <van-tabs v-model="articleTabIndex" @change="changeTabs">
            <van-tab v-for="(item, index) in articleTabList" :key="index" :title="item.name"></van-tab>
        </van-tabs>
        <div class="article_index_main" v-for="(item, index) in articleData" :key="index">
            <div class="article_index_img" v-if="item.cover && item.cover !== ''">
                <img :src="item.cover" alt="">
            </div>
            <div class="article_index_main_info">
                <h2>{{ item.name }}</h2>
                <p>{{ item.desc }}</p>
                <div class="article_index_info">
                    <span>{{ item.trade }}</span>
                    <span style="margin-left: .4rem;">{{ item.created }}</span>
                    <van-icon name="delete" @click="del(item)"></van-icon>
                    <van-icon name="edit" @click="edit(item)"></van-icon>
                </div>
            </div>
        </div>
        <van-pagination
                v-model="page.current"
                :total-items="page.total"
                mode="simple"
                :items-per-page="page.size"
                @change="changeSize(page.current)">
        </van-pagination>
    </div>
</template>

<script>
    import { Dialog, Toast } from 'vant'

    export default {
        name: "my_publish",
        data() {
            return {
                articleData: [
                    { name: '微信文章1', cover: 'https://img8.souweixin.com/20190515/38/5ba488457bbc57bcc05d69a7f75e9bb5.jpeg', created: '2019-05-15', trade: '微信群', desc: '诚信做微商，信誉第一.影视圈' },
                    { name: '微信文章1', cover: 'https://img8.souweixin.com/20190515/38/5ba488457bbc57bcc05d69a7f75e9bb5.jpeg', created: '2019-05-15', trade: '公众号', desc: '诚信做微商，信誉第一.影视圈'  }
                ],
                articleTabIndex: 0,
                articleTabList: [
                    {name: '阅读推荐', value: 'tj'},
                    {name: '微商杂谈', value: 'zt'},
                    {name: '养生之道', value: 'ys'}
                ],
                articleTab: '',
                page: {
                    current: 1,
                    size: 5,
                    total: 0
                }
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
            // 修改tabs
            changeTabs(index, title) {
                const obj = this.articleTabList.filter((value) => {
                    return title === value.name
                })
                this.articleTab = obj[0].value.value
            },
            // 改变页码
            changeSize(val) {
                console.log(val)
                this.page.current = val
                this.fetchData()
            },
            // 编辑
            edit(data) {
                this.$router.push({
                    path: '/publish',
                    query: {
                        title: `编辑${data.trade}`,
                        type: data.trade
                    }
                })
            },
            // 删除
            del(data) {
                Dialog.confirm({message: '确定删除？'})
                    .then(() => {
                        Toast.success('删除成功')
                    })
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .article_index_main {
        display: flex;
        padding: 1rem;
        border-bottom: 1px solid #ececec;

        .article_index_img {
            flex: 0 0 30%;
            margin-right: 1rem;
        }

        .article_index_main_info {
            flex: 1;
            margin-left: .17rem;
            position: relative;
        }

        h2 {
            font-size: 1.8rem;
            font-weight: bold;
            color: #333;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 24px;
        }

        .article_index_info{
            position: absolute;
            bottom: 0;
            width: 100%;

            .van-icon{
                float: right;

                &:before {
                    font-size: 1.6rem;
                }
            }
            .van-icon-edit{
                color: #1784ef;
                margin-right: .3rem;
            }
            .van-icon-delete{
                color: #ef3b3b;
            }
        }

        span {
            color: #B4B4B4;
            font-size: 1.2rem;
        }

        .van-icon {
            color: #bbb;
            font-size: 1.2rem;

            &:before {
                position: relative;
                top: 3px;
                margin-right: 3px;
                font-size: 1.4rem;
            }
        }

        &:last-child {
            border-bottom: 0 none;
        }
    }
</style>