<template>
  <div ref="preloader" class="preloader">
  </div>
</template>

<script>
export default {
  name: "preloader",
  data() {
    return {
    }
  },
  mounted() {
    this.open()
    setTimeout(() => {
      this.close()
    }, 100)
  },
  methods: {
    open() {

    },
    close() {
      this.$store.dispatch('SET_IS_FIRST_LOAD', false)
      this.$refs.preloader.classList.toggle('closed', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 999999;
  background: var(--bg-color);
  transition: opacity 0.3s;
  transition-delay: 0.3s;

  .round-dark {
    position: absolute;
    left: 30vw;
    top: 80vh;
    transform: translate(-50%, -50%);
    width: 200px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: var(--bg-dark-color);
    z-index: 1;
    filter: blur(5px);
  }

  .round-light {
    position: absolute;
    left: 100vw;
    top: 55vh;
    transform: translate(-50%, -50%);
    width: 300px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: var(--bg-light-color);
    z-index: 1;
    filter: blur(120px);
  }

  img {
    height: 33%;
    width: 100vw;
    object-fit: cover;
    transition: transform 0.4s;
    user-select: none;
    pointer-events: none;
    z-index: 3;
  }

  span {
    color: var(--main-color);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100vw;
  }

  &.closed {
    opacity: 0;
    pointer-events: none;

    img:nth-of-type(1) {
      transform: translateX(-100%);
    }

    img:nth-of-type(2) {
      transform: translateX(100%);
    }

    img:nth-of-type(3) {
      transform: translateX(-100%);
    }
  }
}
</style>
