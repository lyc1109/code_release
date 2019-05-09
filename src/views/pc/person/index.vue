<template>
    <div class="home">
        <header-box actived="/person" type="person"></header-box>
        <div class="article_main">个人中心</div>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/pc/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: "person",
        components: {
            headerBox,
            footerBox
        }
    }
</script>

<style scoped lang="scss" type="text/scss">

</style>