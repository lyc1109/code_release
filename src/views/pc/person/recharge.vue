<template>
    <div class="home">
        <header-box actived="/person" type="person"></header-box>
        <div class="article_main">我要充值</div>
        <footer-box></footer-box>
    </div>
</template>

<script>
    import headerBox from '@/components/pc/header'
    import footerBox from '@/components/pc/footer'

    export default {
        name: "recharge",
        components: {
            headerBox,
            footerBox
        }
    }
</script>

<style scoped>

</style>