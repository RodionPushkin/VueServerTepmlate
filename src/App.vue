<template>
  <preloader></preloader>
  <headerComponent></headerComponent>
  <background></background>
  <mainComponent>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </mainComponent>
  <footerComponent></footerComponent>
</template>

<script>
import headerComponent from "@/components/header.component.vue";
import mainComponent from "@/components/main.component.vue";
import footerComponent from "@/components/footer.component.vue";
import Background from "@/components/background.component.vue";
import Preloader from "@/components/preloader.component.vue";

export default {
  components: {Preloader, Background, headerComponent, mainComponent, footerComponent},
  data() {
    return {}
  },
  mounted() {
    setInterval(()=>{
      if(localStorage.getItem('token')){
        this.$api.put('user/refresh').then((res)=>{
          if(res == 'logout'){
            throw "logout"
          }else{
            localStorage.setItem('token',res.access_token)
            this.$peer._options.token = localStorage.getItem('token')
            this.$peer.disconnect()
            this.$peer.reconnect()
          }
        }).catch(err=>{
          this.$peer.destroy()
          localStorage.removeItem('token')
          this.$router.push('/auth')
        })
      }
    },3*60*1000)
  },
  methods: {}
}
</script>
<style lang="scss">
@font-face {
  font-family: 'Steppe';
  src: url("@/assets/fonts/Steppe.ttf");
}
* {
  padding: 0;
  margin: 0;
  border: 0;
  scroll-behavior: smooth;
}

*, *:before, *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-osx-font-smoothing: antialiased;
  -webkit-font-smoothing: grayscale;
}

:focus, :active {
  outline: none;
}

a:focus, a:active {
  outline: none;
}

nav, footer, header, aside {
  display: block;
}

html, body {
  height: 100%;
  width: 100%;
  line-height: 1;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

input, button, textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}

button, .button {
  cursor: pointer;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

a, a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

h1, h2, h3, h4, h5, h6, a, p, span {
  font-size: inherit;
  font-weight: inherit;
  color: inherit
}

body {
  min-height: 100vh;
  width: 100vw;
  font-family: 'Steppe', Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: var(--font-color);
  overflow-y: overlay;
  overflow-x: hidden;
  background: var(--bg-color);
}

html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app .header {
  flex: 0 0 auto;
}

#app .main {
  flex: 1 0 auto;
}

#app .footer {
  flex: 0 0 auto;
}

@media (min-width: 768px) {
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    background: #8a8a8a;
    background-clip: content-box;
    border: 3px solid rgba(0, 0, 0, 0.0);
    border-radius: 100px;
  }
  ::-webkit-scrollbar-track-piece {
    background: rgba(0, 0, 0, 0.0);
  }
  ::-webkit-scrollbar-button {
    background: rgba(0, 0, 0, 0.0);
  }
  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0.0);
  }
}

:root {
  --font-color: rgba(255,255,255,0.95);
  --font-color1: rgba(255,255,255,0.90);
  --font-color2: rgba(255,255,255,0.80);
  --font-color3: rgba(255,255,255,0.20);
  --font-color4: #0C0C0C;
  --bg-color: linear-gradient(262.22deg, #0C0C0C 2.24%, #000000 95.41%);
  --main-color: #6BD600;
  --bg-light-color: linear-gradient(251.04deg, #AAAAAA 11.26%, #FFFFFF 102.52%);
  --bg-dark-color: linear-gradient(251.04deg, #121212 11.26%, #000000 102.52%);
  --border-radius: 4px;
}

input, select {
  min-width: 272px;
  min-height: 56px;
  font-size: 16px;
  padding: 0 16px;
  display: block;
  border-radius: var(--border-radius);
  background: var(--font-color);
  color: var(--font-color4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

button, .button {
  min-width: 272px;
  min-height: 56px;
  font-size: 16px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: var(--border-radius);
  background: var(--main-color);
  color: var(--bg-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  font-weight: 600;
  transition: background 0.35s, color 0.2s;
  @media screen and (min-width: 768px) {
    &:hover {
      background: var(--font-color);
      color: var(--font-color4);
    }
  }
}

.container {
  width: 100%;
  max-width: 1344px;
  padding: 0 72px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding: 0 24px;
  }
}

.main {
  overflow: hidden;
  position: relative;
}

.shadow {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.s {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}

.m {
  font-weight: 500;
  font-size: 50px;
  line-height: 60px;
  @media screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 28px;
  }
}

.l {
  font-weight: 600;
  font-size: 72px;
  line-height: 86px;
  color: var(--black-color);
  @media screen and (max-width: 768px) {
    font-size: 40px;
    line-height: 50px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
