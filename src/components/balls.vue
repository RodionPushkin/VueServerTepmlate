<template>
  <div class="effects">
    <div>
      <p></p>
    </div>
    <div></div>
    <div></div>
    <div class="rounds">
      <svg ref="round1" fill="none" viewBox="0 0 506 521" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd"
              d="M173.368 148.742C91.3476 189.814 58.1527 289.6 99.2248 371.62C140.297 453.64 240.083 486.835 322.103 445.763C404.123 404.691 437.318 304.905 396.246 222.885C355.174 140.865 255.388 107.67 173.368 148.742Z"
              fill="black"
              fill-rule="evenodd"/>
      </svg>
      <svg ref="round2" fill="none" viewBox="0 0 506 521" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd"
              d="M173.368 148.742C91.3476 189.814 58.1527 289.6 99.2248 371.62C140.297 453.64 240.083 486.835 322.103 445.763C404.123 404.691 437.318 304.905 396.246 222.885C355.174 140.865 255.388 107.67 173.368 148.742Z"
              fill="black"
              fill-rule="evenodd"/>
      </svg>
      <svg ref="round3" fill="none" viewBox="0 0 506 521" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd"
              d="M173.368 148.742C91.3476 189.814 58.1527 289.6 99.2248 371.62C140.297 453.64 240.083 486.835 322.103 445.763C404.123 404.691 437.318 304.905 396.246 222.885C355.174 140.865 255.388 107.67 173.368 148.742Z"
              fill="black"
              fill-rule="evenodd"/>
      </svg>
      <svg ref="round4" fill="none" viewBox="0 0 506 521" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd"
              d="M173.368 148.742C91.3476 189.814 58.1527 289.6 99.2248 371.62C140.297 453.64 240.083 486.835 322.103 445.763C404.123 404.691 437.318 304.905 396.246 222.885C355.174 140.865 255.388 107.67 173.368 148.742Z"
              fill="black"
              fill-rule="evenodd"/>
      </svg>
      <svg ref="round5" fill="none" viewBox="0 0 506 521" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd"
              d="M173.368 148.742C91.3476 189.814 58.1527 289.6 99.2248 371.62C140.297 453.64 240.083 486.835 322.103 445.763C404.123 404.691 437.318 304.905 396.246 222.885C355.174 140.865 255.388 107.67 173.368 148.742Z"
              fill="black"
              fill-rule="evenodd"/>
      </svg>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import {TweenMax} from "gsap";

export default {
  name: "balls",
  data() {
    return {
      animation: this.$store.getters.ANIMATION
    }
  },
  watch: {
    '$store.state.animation': () => {
      console.log(1)
      if (this?.$refs?.round1) {
        TweenMax.to(this.$refs.round1, this.calcParams())
        TweenMax.to(this.$refs.round2, this.calcParams())
        TweenMax.to(this.$refs.round3, this.calcParams())
        TweenMax.to(this.$refs.round4, this.calcParams())
        TweenMax.to(this.$refs.round5, this.calcParams())
      }
    }
  },
  mounted() {
    TweenMax.to(this.$refs.round1, this.calcParams())
    TweenMax.to(this.$refs.round2, this.calcParams())
    TweenMax.to(this.$refs.round3, this.calcParams())
    TweenMax.to(this.$refs.round4, this.calcParams())
    TweenMax.to(this.$refs.round5, this.calcParams())
    setInterval(() => {
      TweenMax.to(this.$refs.round1, this.calcParams())
      TweenMax.to(this.$refs.round2, this.calcParams())
      TweenMax.to(this.$refs.round3, this.calcParams())
      TweenMax.to(this.$refs.round4, this.calcParams())
      TweenMax.to(this.$refs.round5, this.calcParams())
    }, 9000)
  },
  methods: {
    calcParams: () => {
      return {
        x: (Math.random() > 0.5 ? 1 : -1) * Math.random() * (document.body.offsetWidth / 2) * 0.8,
        y: (Math.random() > 0.5 ? 1 : -1) * Math.random() * (document.body.offsetHeight / 2) * 0.8,
        duration: 10,
        scale: Math.random() * 3,
        ease: "back.out(2)",
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.effects, .effects > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.effects {
  pointer-events: none;
  background: #ffffff;
  position: fixed;
  z-index: -1;

  > div:nth-of-type(1) p {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #7F00FF 23.75%, #E100FF 76.87%);
    pointer-events: none;
  }

  > div:nth-of-type(1) {
    mix-blend-mode: screen;
    z-index: 3;
  }

  > div:nth-of-type(2) {
    background: #ffffff;
    mix-blend-mode: overlay;
    z-index: 2;
  }

  > div:nth-of-type(3) {
    background: #090909;
    mix-blend-mode: exclusion;
    z-index: 3;
  }

  svg {
    //transition: 0.3s;
    position: absolute;
    aspect-ratio: 1/1;

    &:nth-of-type(1) {
      height: 150px;
    }

    &:nth-of-type(2) {
      height: 220px;
    }

    &:nth-of-type(3) {
      height: 240px;
    }

    &:nth-of-type(4) {
      height: 200px;
    }

    &:nth-of-type(5) {
      height: 100px;
    }
  }

  .rounds {
    display: flex;
    filter: blur(20px);
    z-index: 1;
    align-items: center;
    justify-content: center;
  }
}
</style>
