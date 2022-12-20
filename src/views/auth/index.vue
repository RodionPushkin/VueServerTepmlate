<template>
  <form class="container" @submit.prevent="send" autocomplete="off">
    <h1 class="m">Авторизация</h1>
    <textinput type="email" placeholder="почта" :value="email" @custominput="email=$event"></textinput>
    <textinput type="password" placeholder="пароль" :value="password" @custominput="password=$event"></textinput>
    <button type="submit">войти</button>
  </form>
</template>
<script>

import textinput from "@/components/textinput.component.vue";

export default {
  name: "auth",
  components: {textinput},
  data() {
    return {
      email: 'test.email@yandex.ru',
      password: '12345678'
    }
  },
  mounted() {
  },
  methods: {
    send(){
      this.$api.put('user',undefined,{email:this.email,password:this.password}).then(res=>{
        if(res.message){
          console.log(res)
        }else if(res.access_token){
          localStorage.setItem('token',res.access_token)
          this.$peer._options.token = localStorage.getItem('token')
          this.$peer.disconnect()
          this.$peer.reconnect()
          this.$router.push('/')
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
}
</style>
