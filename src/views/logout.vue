<template>
    <div>正在退出登录...</div>
</template>

<script>
    // import axios from 'axios'

    export default {
        name: "logout",
        created() {
            this.logout()
        },
        methods: {
            logout() {
                this.$api.logout().then((res) => {
                // axios({
                //     url: '/api/sys/logout',
                //     method: 'GET'
                // }).then((res) => {
                    if (res) {
                        setTimeout(() => {
                            this.$router.push('/home')
                        }, 1000)
                        sessionStorage.removeItem('user')
                        Toast.success('已退出登录')
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>