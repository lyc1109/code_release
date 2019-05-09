<template>
    <div class="home">
        <header-box actived="/article"></header-box>
        <div class="article_main">微信文章</div>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/pc/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: "articleDetail",
        components: {
            headerBox,
            footerBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
</style>