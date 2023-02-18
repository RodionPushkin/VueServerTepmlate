<template>
  <form class="container" @submit.prevent="send" autocomplete="off">
    <h1 class="m">Регистрация</h1>
    <div class="input">
      <input type="email" v-model="email" placeholder=" " minlength="6" maxlength="128">
      <label>почта</label>
    </div>
    <div class="input">
      <input type="password" v-model="password" placeholder=" " minlength="6" maxlength="32">
      <label>пароль</label>
    </div>
    <div class="input">
      <input type="password" v-model="passwordrepeat" placeholder=" " minlength="6" maxlength="32">
      <label>повторите пароль</label>
    </div>
    <button type="submit">зарегистрироваться</button>
    <router-link to="/auth">войти</router-link>
  </form>
</template>
<script>


export default {
  name: "auth",
  data() {
    return {
      email: `test.${new Date().getTime()}@yandex.ru`,
      password: '12345678',
      passwordrepeat: '12345678'
    }
  },
  mounted() {
  },
  methods: {
    send(){
      this.$api.post('user',undefined,{email:this.email,password:this.password}).then(res=>{
        if(res.message){
          console.log(res)
        }else if(res.access_token){
          localStorage.setItem('token',res.access_token)
          // this.$peer._options.token = localStorage.getItem('token')
          // this.$peer.disconnect()
          // this.$peer.reconnect()
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
