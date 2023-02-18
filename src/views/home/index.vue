<template>
  <div class="container first">
    <h1 class="l">Главная</h1>
    <div class="cards" ref="cards" @mouseleave="stopDrag">
      <div class="card-wrapper"
           v-for="(item, index) in cards"
           :key="index" :style="`width: ${item.size.x}px; height: ${item.size.y}px;`">
        <div class="card"
             :style="`width: ${item.size.x}px; height: ${item.size.y}px;`"
             @mousedown="mouseStart($event,item)"
             @mouseup="mouseEnd($event,item)"
             @mousemove="mouseMove($event,item)"
             @touchstart="touchStart($event,item)"
             @touchend="touchEnd($event,item)"
             @touchmove="touchMove($event,item)">
<!--          <span>{{ item.index }}</span>-->
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {gsap,TweenMax} from "gsap"
export default {
  name: "home",
  data() {
    return {
      cards: [
        {
          index: 0,
          text: "1",
          size:{
            x: 256,
            y: 512
          }
        },
        {
          index: 1,
          text: "2",
          size:{
            x: 512,
            y: 256
          }
        },
        {
          index: 2,
          text: "3",
          size:{
            x: 128,
            y: 256
          }
        },
        {
          index: 3,
          text: "4",
          size:{
            x: 128,
            y: 128
          }
        },
      ],
      drag: {
        item: undefined,
        interval: undefined
      }
    }
  },
  methods: {
    touchStart(event, item) {
      if (window.mobileAndTabletCheck() && !this.drag.item) {
        this.animate(event.target,100)
        this.drag.item = item
        event.target.classList.toggle('active', true)
        clearInterval(this.drag.interval)
        this.drag.interval = setInterval(()=>{
          TweenMax.to(event.target, 0.03, {
            rotation: `3`,
            yoyo: true,
            repeat: 1,
          });
        },100)
      }
    },
    touchEnd(event, item) {
      if (window.mobileAndTabletCheck()){
        for (let i = 0; i < this.$refs.cards.querySelectorAll('.card').length; i++) {
          const index = i
          const card = this.$refs.cards.querySelectorAll('.card')[i]
          if (index != this.cards.find(c => c == item).index &&
            event.changedTouches[0].pageX >= card.offsetLeft &&
            event.changedTouches[0].pageX <= card.offsetWidth + card.offsetLeft &&
            event.changedTouches[0].pageY >= card.offsetTop &&
            event.changedTouches[0].pageY <= card.offsetHeight + card.offsetTop) {
            let newIndex = this.cards[index].index
            this.cards[index].index = item.index
            this.cards.map(c=>{
              if(c != this.cards[index] && c.index == item.index){
                c.index = newIndex
              }
              return c
            })
            this.filterByIndex()
            break
          }
        }
        this.stopDrag()
      }
    },
    touchMove(event, item) {
      if (window.mobileAndTabletCheck() && this.drag.item) {
        // event.target.style.top = `${event.changedTouches[0].pageY - event.target.offsetHeight / 2}px`
        // event.target.style.left = `${event.changedTouches[0].pageX - event.target.offsetWidth / 2}px`
        gsap.to(event.target,{
          top: event.changedTouches[0].pageY - event.target.offsetHeight / 2,
          left: event.changedTouches[0].pageX - event.target.offsetWidth / 2,
          duration: 0
        })
      }
    },
    mouseStart(event, item) {
      if (!window.mobileAndTabletCheck() && !this.drag.item) {
        this.animate(event.target,100)
        this.drag.item = item
        event.target.classList.toggle('active', true)
        clearInterval(this.drag.interval)
        this.drag.interval = setInterval(()=>{
          TweenMax.to(event.target, 0.03, {
            rotation: `3`,
            yoyo: true,
            repeat: 1,
          });
        },100)
      }
    },
    mouseEnd(event, item) {
      if (!window.mobileAndTabletCheck()){
        for (let i = 0; i < this.$refs.cards.querySelectorAll('.card').length; i++) {
          const index = i
          const card = this.$refs.cards.querySelectorAll('.card')[i]
          if (index != this.cards.find(c => c == item).index &&
            event.pageX >= card.offsetLeft &&
            event.pageX <= card.offsetWidth + card.offsetLeft &&
            event.pageY >= card.offsetTop &&
            event.pageY <= card.offsetHeight + card.offsetTop) {
            let newIndex = this.cards[index].index
            this.cards[index].index = item.index
            this.cards.map(c=>{
              if(c != this.cards[index] && c.index == item.index){
                c.index = newIndex
              }
              return c
            })
            this.filterByIndex()
            break
          }
        }
        this.stopDrag()
      }
    },
    mouseMove(event, item) {
      if (!window.mobileAndTabletCheck() && this.drag.item) {
        gsap.to(event.target, {
          top: event.pageY - event.target.offsetHeight / 2,
          left: event.pageX - event.target.offsetWidth / 2,
          duration: 0
        })
        // event.target.style.top = `${event.pageY - event.target.offsetHeight / 2}px`
        // event.target.style.left = `${event.pageX - event.target.offsetWidth / 2}px`
      }
    },
    stopDrag() {
      if (this.drag.item) {
        this.drag.item = undefined
        clearInterval(this.drag.interval)
        this.$refs.cards.querySelectorAll('.card').forEach((card, index) => {
          // card.style.top = "auto"
          // card.style.left = "auto"
          card.classList?.toggle('active', false)
          gsap.to(card, {
            top: "auto",
            left: "auto",
            duration: 0.3,
            rotation: 0
          })
        })
      }
    },
    filterByIndex(){
      for (let j = this.cards.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
          if (this.cards[i].index > this.cards[i + 1].index) {
            let temp = this.cards[i];
            this.cards[i] = this.cards[i + 1];
            this.cards[i + 1] = temp;
          }
        }
      }
      console.log(this.cards)
    },
    vibrate(value) {
      let navigator = window.navigator;
      if ("vibrate" in navigator) {
        navigator.vibrate(value);
      } else if ("oVibrate" in navigator) {
        navigator.oVibrate(value);
      } else if ("mozVibrate" in navigator) {
        navigator.mozVibrate(value);
      } else if ("webkitVibrate" in navigator) {
        navigator.webkitVibrate(value);
      }
    },
    animate(el = document.body, vibration = 0) {
      if (!el.classList.contains("card")) {
        if (!el.parentElement.classList.contains("card")) {
          if (!el.parentElement.parentElement.classList.contains("card")) {
          } else {
            el = el.parentElement.parentElement;
          }
        } else {
          el = el.parentElement;
        }
      }
      this.vibrate(vibration);
      if (vibration == 0) {
        el.style.transform = "none";
      } else {
        TweenMax.to(el, 0.03, {
          rotation: `2`,
          yoyo: true,
          repeat: 1,
        });
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.cards {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  .card-wrapper {
    width: 256px;
    height: 256px;
    @media screen and (max-width: 768px) {
      width: 128px;
      height: 128px;
    }
    background: rgba(220, 220, 220, 0.25);
    border-radius: 4px;
  }

  .card {
    width: 256px;
    height: 256px;
    @media screen and (max-width: 768px) {
      width: 128px;
      height: 128px;
    }
    padding: 24px;
    background: #e1e1e1;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-xxl);
    position: absolute;
    color: var(--color-accent);
    cursor: pointer;
    user-select: none;

    &.active {
      z-index: 999;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.03);
    }

    span {
      position: absolute;
      top: 16px;
      left: 16px;
      font-size: var(--font-s);
      color: var(--color-font);
      pointer-events: none;
    }
  }
}
</style>
