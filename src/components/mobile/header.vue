<template>
    <div>
        <nav class="m_header flex">
            <div class="list_icon">
                <van-icon name="bars"></van-icon>
            </div>
            <div class="m_logo">
                <span>微信群</span>
<!--                <img src="" alt="">-->
            </div>
            <div class="m_right_icon">
                <van-icon name="search"></van-icon>
                <van-icon name="user-circle-o"></van-icon>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "header"
    }
</script>

<style scoped lang="scss" type="text/scss">
    .m_header{
        height: 50px;
        background: #555;
        width: 100%;
        color: #fff;

        &>div{
            flex: 1;
        }
    }
</style>