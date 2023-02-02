<template>
  <div>
    <p class="m">Упс, ошибка 404, вы будете перенесены на главную страницу через {{time}} сек.</p>
  </div>
</template>

<script>
import './404.style.scss';

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
