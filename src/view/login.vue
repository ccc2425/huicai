<template>
    <div></div>
</template>

<script>
    export default {
      name: "login",
      created(){
      },
      mounted(){
        if (localStorage.getItem('token')) {
          this.$router.push('/index')
        }else {
          this.$('user/wxauthurl',{},res=>{
            console.log(res)
            // alert(res.code+','+res.data)
            if (res.code === 200){
              window.location.href = res.data
            } else {
              alert(res.msg)
            }
          })
        }
      },
      methods:{
      }
    }
</script>

<style scoped>

</style>
