<template>
    <div class="home">
        <header-box actived="/article" :isList="true"></header-box>
        <el-card shadow="never" class="article_main">
            <h1>{{ article.name }}</h1>
            <div class="article_info">
                <span>发布人：{{ section }}</span>
                <span>发布时间：{{ article.createTime }}</span>
            </div>
            <div class="article_content">
                <p v-html="article.content"></p>
            </div>
        </el-card>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/pc/header'
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
    .article_main{
        margin-top: 20px;
        /*border: 1px solid #eee;*/
        /*padding: 20px;*/
        
        h1{
            text-align: center;
        }
        .article_info{
            margin: 10px 0;
            text-align: center;
            
            span{
                font-size: 14px;
                color: #888;
                margin-right: 10px;
            }
        }
        .article_content{
            margin-top: 30px;

            p{
                color: #333;
                font-size: 16px;
            }
        }
    }
</style>