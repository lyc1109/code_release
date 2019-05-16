<template>
    <div>
        <div class="person_m">
            <div class="avatar_m">
                <img src="../../../assets/images/avatar.jpg" alt="">
            </div>
            <p class="user_name">最帅的仔</p>
            <div class="user_info_num_list flex">
                <div class="user_info_num" v-for="(item, index) in userInfo" :key="index" @click="toDetail(item)">
                    <span class="info_num">{{ item.num }}</span>
                    <p>{{ item.title }}</p>
                </div>
            </div>
        </div>
        <van-cell-group title="内容管理">
            <van-cell v-for="(item, index) in operateList"
                      :key="index"
                      :title="item.title"
                      :value="item.value"
                      is-link
                      :to="item.url"></van-cell>
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

    export default {
        name: "person",
        data() {
            return {
                userInfo: [
                    {title: '金币', num: 500},
                    {title: '发布', num: 5, url: '/my_publish'},
                    {title: '推广', num: 3, url: '/my_spread'},
                    {title: '文章', num: 8, url: '/my_publish'}
                ],
                operateList: [
                    { title: '发布微信群', value: '', url: '/publish' },
                    { title: '发布公众号', value: '', url: '/publish' },
                    { title: '发布个人微信号', value: '', url: '/publish' },
                    { title: '发布文章', value: '', url: '/publish_article' },
                    { title: '发布其他', value: '', url: '/publish' }
                ],
                operateList2: [
                    { title: '修改资料', value: '', url: '/profile' },
                    { title: '我要充值', value: '', url: '/recharge' },
                    { title: '明细记录', value: '', url: '/record' },
                    { title: '金币规则', value: '', url: '' }
                ],
                rule: true
            }
        },
        methods: {
            toDetail(data) {
                if (data.title === '金币规则')
                    this.rule = true
                else
                    this.$router.push(data.url)
            },
            toggleRule(val) {
                return val ? this.rule = true : this.rule = false
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
        
        .user_name{
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
    .van-cell-group__title{
        border-top: 1px solid #ccc;
        font-weight: bold;
    }
</style>