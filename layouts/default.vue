<template>
  <div class="App">
    <div ref="parallaxBg" class="ParallaxBg"></div>

    <div class="GBLMContainer">
      <TopNav @search="searchOn = !searchOn" />
      <Process />

      <ClientOnly>
        <Search v-show="searchOn" @searchoff="searchOn = false" />
      </ClientOnly>

      <section class="Routes">
        <!-- <transition name="slide-fade" mode="out-in"> -->
        <slot />
        <!-- </transition> -->
      </section>

      <Footer />
      <BottomNav />
    </div>
  </div>
</template>

<script lang="ts">
import { $General } from "@/addons";
import { useNavs } from "@/store";

export default {
  setup() {
    // const runtimeConfig = useRuntimeConfig();
    // const $CMS = useCMS();

    const { $aos } = useNuxtApp();

    const parallaxBg = ref(null);

    const $Navs = useNavs();
    const searchOn = ref(false);

    onMounted(() => {
      $Navs.setContainer(window ? window : document.body);
      $Navs.setParallaxElem(parallaxBg.value);
      $Navs.setScrollEvent();
      $General.insertLinks();
      $General
        .loadScript()
        .then(() => {
          $General.hideCaptchaBadge();
        })
        .catch((e) => {});
    });

    // const { data, error, pending } = useAsyncData(async () => {
    //   const client = $CMS.initClient(runtimeConfig);
      // return ''
    // });

    // const cmsData = computed(async () => {
    //   return await $CMS.initClient(runtimeConfig)
    // });

    onMounted(() => $aos());

    onUnmounted(() => {
      $Navs.removeScrollEvent();
    });

    return {
      searchOn,
      parallaxBg,
      // cmsData
    };
  },
};
</script>

<style lang="scss">
.main-layout-leave-active,
.main-layout-enter-active {
  transition: all 0.3s ease-in-out;
}
.main-layout-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
.main-layout-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.App {
  position: relative;
  overflow: hidden;
  width: 100vw;
  min-height: 100vh; /* Adjust the height as needed */
}
.GBLMContainer {
  display: table;
  position: relative;
  min-height: 100vh;
  height: 100%;
  width: 100%;

  & > .Routes {
    padding-bottom: 50px;
  }
  z-index: 1;
}
.ParallaxBg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/defaults/pgs/hgt3.png"); /* Replace '~/assets/background.jpg' with your image path */
  background-size: contain;
  background-repeat: repeat;
  // transform: translateZ(-1px) scale(1.5);
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1 !important;
    background-color: rgba(255, 255, 255, 0.725);
  }
}
</style>
