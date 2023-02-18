<template>
  <div class="container">
    <p>Упс, ошибка 404, вы будете перенесены на главную страницу через {{time}} сек.</p>
  </div>
</template>

<script>

export default {
  name: "404",
  data() {
    return {
      time: 15
    }
  },
  async mounted() {
    let interval = setInterval(()=>{
      this.time--
      if(this.time <= 0){
        this.$router.push('/')
        clearInterval(interval)
      }
    },1000)
  }
}
</script>
<style lang="scss" scoped>
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
  font-size: var(--font-xl);
  text-align: center;
}
</style>
