<template>
    <div></div>
</template>

<script>
    export default {
      name: "release",
      data(){
        return{
        }
      },
      mounted() {
        if (localStorage.getItem('go')== 1){
          this.$router.replace(localStorage.getItem('url'))
        } else {
          this.$router.push('business/createad')
        }
      }
    }
</script>

<style scoped>

</style>
