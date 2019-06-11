<template>
    <div>
        <div class="person_m">
            <div class="avatar_m">
                <img :src="user && user.coverUrl ? user.coverUrl : avatar" alt="">
            </div>
            <p class="user_name">{{ user.user }}</p>
            <div class="user_info_num_list flex">
                <div class="user_info_num" v-for="(item, index) in userInfo" :key="index" @click="toDetail(item)">
                    <span class="info_num">{{ item.num }}</span>
                    <p>{{ item.title }}</p>
                </div>
            </div>
        </div>
        <van-cell title="返回首页" is-link to="/"></van-cell>
        <van-cell-group title="内容管理">
            <van-cell v-for="(item, index) in operateList"
                      :key="index"
                      :title="item.name"
                      value=""
                      is-link
                      @click="toPublish(item)"></van-cell>
        </van-cell-group>
        <van-cell-group title="个人中心">
            <van-cell v-for="(item, index) in operateList2"
                      :key="index"
                      :title="item.title"
                      :value="item.value"
                      is-link
                      :to="item.url" @click="toDetail(item)"></van-cell>
        </van-cell-group>

        <rule-box :is-show="rule" @toggle="toggleRule"></rule-box>
    </div>
</template>

<script>
    import ruleBox from '@/views/mobile/person/rule'
    import {Dialog, Toast} from 'vant'
    import avatar from '@/assets/images/avatar.jpg'

    export default {
        name: "person",
        data() {
            return {
                avatar: avatar,
                user: {
                    user: ''
                },
                userInfo: [
                    {title: '金币', num: 0},
                    {title: '已发布', num: 0, url: '/my_publish?type=fb'},
                    {title: '推广', num: 0, url: '/my_spread'},
                    {title: '文章', num: 0, url: '/my_publish?type=wz'}
                ],
                operateList: [],
                operateList2: [
                    {title: '修改资料', value: '', url: '/profile'},
                    {title: '赚金币', value: '', url: '/getGold'},
                    {title: '我要充值', value: '', url: '/recharge'},
                    {title: '明细记录', value: '', url: '/record'},
                    {title: '金币规则', value: '', url: ''},
                    {title: '退出', value: '', url: ''}
                ],
                rule: false
            }
        },
        created() {
            this.fetchMenus()
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.$api.getUserInfo().then((res) => {
                    if (res) {
                        this.user = res.user
                    }
                })
                // 获取个人中心信息
                this.$api.getBuzzInfo().then((res) => {
                    if (res) {
                        this.userInfo[0].num = res.coin
                        this.userInfo[1].num = res.publish
                        this.userInfo[2].num = res.popularize
                        this.userInfo[3].num = res.article
                    }
                })
            },
            // 初始化左侧menus
            fetchMenus() {
                this.$api.getTradeList().then((res) => {
                    if (res) {
                        this.operateList = res.data
                        this.operateList.forEach((value) => {
                            value.name = `发布${value.name}`
                        })
                    }
                })
            },
            toDetail(data) {
                if (data.title === '金币规则')
                    this.rule = true
                else if (data.title === '退出') {
                    Dialog.confirm({message: '确定退出吗？'})
                        .then(() => {
                            this.$api.logout().then((res) => {
                                if (res) {
                                    setTimeout(() => {
                                        this.$router.push('/home')
                                    }, 1000)
                                    sessionStorage.removeItem('loginStatus')
                                    Toast.success('已退出登录')
                                }
                            }).catch((err) => {
                                console.log(err)
                            })
                        })
                } else
                    this.$router.push(data.url)
            },
            toggleRule(val) {
                return val ? this.rule = true : this.rule = false
            },
            toPublish(data) {
                let url = ''
                if (data.modelType === 1 || data.modelType === 0)
                    url = '/publish'
                else {
                    url = '/publish_article'
                }
                this.$router.push({
                    path: url,
                    query: {
                        title: data.title,
                        type: data.id,
                        modelType: data.modelType
                    }
                })
            }
        },
        components: {
            ruleBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .person_m {
        background: #5e789b;
        padding-top: 2rem;

        .user_name {
            color: #fff;
            text-align: center;
            font-size: 1.8rem;
            margin-bottom: 1rem;
        }
    }

    .avatar_m {
        margin-bottom: 1rem;
        text-align: center;

        img {
            width: 5rem;
            height: 5rem;
            border: 3px solid #eee;
            border-radius: 50%;
        }
    }

    .user_info_num {
        line-height: 30px;
        text-align: center;
        flex: 1;
        background: #526887;
        color: #fff;
        padding: .3rem 0;

        span {
            font-size: 2rem;
            font-weight: bold;
        }

        p {
            font-size: 1.6rem;
        }
    }

    .van-cell-group__title {
        border-top: 1px solid #ccc;
        font-weight: bold;
    }
</style>