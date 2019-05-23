<template>
    <div>
        <header-box :isShowNav="false"></header-box>
        <div class="article_detail_m">
            <h1>{{ article.name }}</h1>
            <div class="article_info">
                <span>发布人：{{ section }}</span>
                <span>发布时间：{{ article.createTime }}</span>
            </div>
            <div class="article_content">
                <p v-html="article.content"></p>
            </div>
        </div>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/mobile/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: "articleDetail",
        data() {
            return {
                article: {
                    name: '',
                    createTime: '',
                    content: ''
                },
                section: ''
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.$api.getArticleDetailPublic({
                    id: this.$route.params.id
                }).then((res) => {
                    if (res) {
                        this.article = res.info
                        this.$api.getTradeList().then((resp) => {
                            resp.data.forEach((value) => {
                                if (value.id === res.info.sectionId) {
                                    this.section = value.name
                                }
                            })
                        })
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
    .article_detail_m{
        margin-top: 1rem;
        padding: 0 2rem;

        /*h1{*/
        /*    text-align: left;*/
        /*}*/
        .article_info{
            margin: .5rem 0;

            span{
                font-size: 1.4rem;
                color: #888;
                margin-right: .5rem;
            }
        }
        .article_content{
            margin-top: 2rem;

            p{
                color: #333;
                font-size: 1.6rem;
            }
        }
    }
</style>