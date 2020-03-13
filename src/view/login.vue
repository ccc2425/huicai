<template>
    <div></div>
</template>

<script>
    export default {
        name: "login",
      mounted(){
          this.login()
      },
      methods:{
          login(){
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bd41abdbcec83f9&redirect_uri=http%3A%2F%2Fgzhtest.xianlubang.com%2Fwxlogin&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
          }
      }
    }
</script>

<style scoped>

</style>
