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
  background: var(--color-main);
  transition: opacity 0.3s;
  transition-delay: 0.6s;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    transition: 0.2s;
    font-size: 128px;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 128px;
    overflow: hidden;
    user-select: none;

    span {
      animation: 0.8s preloader 0.2s forwards;

      &:nth-child(55) {
        color: var(--color-accent);
      }

      @keyframes preloader {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-6912px);
        }
      }
    }
  }

  .active {
    color: var(--color-accent);
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
