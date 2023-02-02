<template>
  <header class="header">
    <div ref="container" class="container">
      <router-link class="logo" to="/" @click="isMenuOpened = false">
        hackers <span>54</span>
      </router-link>
      <input id="burger" v-model="isMenuOpened" type="checkbox">
      <label for="burger">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <nav class="nav">
        <router-link to="/" @click="isMenuOpened = false">главная</router-link>
        <router-link to="/we" @click="isMenuOpened = false">мы</router-link>
        <router-link to="/hackathons" @click="isMenuOpened = false">хакатоны</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "header.component",
  data() {
    return {
      isMenuOpened: false
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  background: var(--color-main-30);
  backdrop-filter: blur(4px);
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 997;
  padding: 24px 0;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 24px;
    font-weight: 500;
    user-select: none;

    span {
      color: var(--color-accent);
    }
  }

  .nav {
    display: flex;
    gap: 32px;
    align-items: center;

    a {
      user-select: none;
      transition: color 0.2s;
      font-size: var(--font-m);
      @media screen and (min-width: 768px) {
        font-size: var(--font-xs);
        &:hover {
          color: var(--color-accent);
        }
      }
    }

    @media screen and (max-width: 768px) {
      color: var(--color-font);
      font-weight: 600;
      font-size: 20px;
    }
  }

  input {
    display: none;
  }

  label {
    display: none;
  }

  @media screen and (max-width: 768px) {
    background: var(--color-main-30);
    backdrop-filter: none;
    .logo {
      z-index: 999;
    }
    .nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(22px);
      transition: 0.2s;
    }
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 48px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      position: relative;
      z-index: 999;
      cursor: pointer;
      transition: 0.2s;

      span {
        width: 32px;
        height: 3px;
        border-radius: 2px;
        background: var(--color-font-30);
        position: absolute;
        transition: 0.2s;

        &:nth-child(1) {
          transform: translateY(-8px);
        }

        &:nth-child(2) {

        }

        &:nth-child(3) {
          transform: translateY(8px);
        }
      }

      @media screen and (min-width: 568px) {
        &:hover {
          span {
            background: var(--color-accent);

            &:nth-child(2) {
              width: 18px;
            }
          }
        }
      }
    }
    input:checked ~ label {
      transform: rotate(-180deg);

      span {
        background: var(--color-accent);

        &:nth-child(1) {
          transform: rotate(-45deg);
        }

        &:nth-child(2) {
          width: 0px;
        }

        &:nth-child(3) {
          transform: rotate(45deg);
        }
      }

      @media screen and (min-width: 568px) {
        &:hover {
          span {
            background: var(--color-accent);

            &:nth-child(2) {
              width: 0px;
            }
          }
        }
      }
    }
    input:checked ~ .nav {
      opacity: 1;
      pointer-events: all;
      transition: opacity 0.2s linear;
      z-index: 998;
    }
  }
}
</style>
