<template>
  <preloader></preloader>
  <headerComponent></headerComponent>
  <mainComponent>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </mainComponent>
</template>

<script>
import mainComponent from "@/components/main.component.vue";
import headerComponent from "@/components/header.component.vue";
import Preloader from "@/components/preloader.component.vue";

export default {
  components: {Preloader, mainComponent, headerComponent},
}
</script>
