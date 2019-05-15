<template>
    <div>
        <header-box :isShowNav="false"></header-box>
        <div class="article_detail_m">
            <h1>{{ article.title }}</h1>
            <div class="article_info">
                <span>发布人：{{ article.author }}</span>
                <span>发布时间：{{ article.created }}</span>
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
                    title: '当孩子被批评了，请告诉孩子：不怕老师批评你，就怕老师不管你！',
                    author: '微信群',
                    created: '2019-05-14 15:07:02',
                    content: `对于家长来说，如果说有什么事儿能比孩子生病更让人心疼焦虑，那就非“孩子生病但就不吃药”莫属了。<br><br>一边看着孩子生病难受心疼不已，一边怎么着都喂不进去药，简直让人抓狂。<br><br>为了将大家从这个“水深火热”的境地里解救出来，今天小编就从以下几方面和大家分享一下关于给孩子喂药的知识。<br><br>喂药前要做哪些准备工作？<br><br>Get正确的喂药方法<br><br>给孩子喂药，记住这“七不要”<br><br>01—喂药前的准备工作<br><br>选好药物剂型<br><br>目前儿童药物多以液体或者颗粒剂为主，此外还有滴剂、混悬剂、咀嚼/、泡腾/剂等，都很方便孩子服用。<br><br>尽量选择孩子能接受的这些剂型，/剂、胶囊等剂型能不选就尽量不选。<br>`
                }
            }
        },
        methods: {},
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