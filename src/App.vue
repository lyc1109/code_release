<template>
  <div id="app">
    <router-view/>
<!--    <img src="./assets/logo.png">-->
<!--    <div>-->
<!--      <p>-->
<!--        If Element is successfully added to this project, you'll see an-->
<!--        <code v-text="'<el-button>'"></code>-->
<!--        below-->
<!--      </p>-->
<!--      <el-button>el-button</el-button>-->
<!--    </div>-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <right-box></right-box>
  </div>
</template>

<script>
  import rightBox from '@/components/pc/suspension'

export default {
  name: 'app',
  components: {
    rightBox
  }
}
</script>
<style>
  body{
    background: #f1f1f1;
  }
</style>
