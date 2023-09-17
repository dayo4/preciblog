<template>
  <GlobalWrapper :header="true" :footNote="true" :useDefaultFootNote="true">
    <template #Title> ABOUT </template>
    <template #SubText>
      <!-- Get your business on the winning edge in the technology-driven world -->
    </template>

    <template #WrapperBody>
      <section class="AB_HeadImg d-flex j-c-center">
        <div class="TopImg xs4 sm3 md2 mb-5">
          <img src="/defaults/pgs/orbrift_ab2.jpg" draggable="false" />
        </div>
      </section>

      <section class="AB_MainHead">
        <div
          class="ContentCont d-flex j-c-center a-i-center bg-img-masked noselect"
        >
          <div class="Img">
            <!-- <img
              src="/defaults/usr/m1.png"
              alt="Samuel Adeniyi"
              draggable="false"
            /> -->
          </div>
          <div class="Content xs11 sm9 md8 d-flex j-c-center a-i-center">
            <h2 class="Text">Precious Adeniyi</h2>
          </div>
        </div>
      </section>
      <section class="AB_MainBody d-flex j-c-center">
        <section class="xs11 sm9 md8 bg-white mb-10 br4">
          <section class="noselect">
            <h2 class="AB_Head pl-8 pr-2 font-bold text-[30px]">About Me</h2>
            <p class="pl-2 mt-4" v-html="author?.about">
              </p>
          </section>
        </section>
      </section>
    </template>
  </GlobalWrapper>
</template>
<script lang="ts">
import { useCMS} from "@/store";

export default {
  setup() {
    const { $myMetaInfo, $aos } = useNuxtApp();
    const $CMS = useCMS();
    const runtimeConfig = useRuntimeConfig();
    useSeoMeta($myMetaInfo({ title: "About | preciblog" }));

    const { data, error, pending } = useAsyncData(async () => {
      
      const author =  await $CMS.getAuthor(runtimeConfig);
      // console.log(author) 
      return {
        author,
      }
    });

    const author = computed(() => {
      if (data.value) {
        console.log(data.value.author[0])
        $CMS.setAuthor(data.value.author[0]);
        return data.value.author[0];
      }
    });

    return {
      author
    };
  },
};
</script>
<style lang="scss" scoped>
.TopImg {
  min-height: 80px;
}
.AB_HeadImg {
  & p {
    font-size: 16px;
  }
}
.AB_Head {
  color: $blue-grey--1;
}
.AB_SubHead {
  padding: 10px;
  background-color: $sec-color-trans-1;
  color: $pri-color;
  border-bottom: solid $sec-color-trans-2 3px;
  border-radius: 4px;
}

.AB_MainHead {
  position: relative;
  height: 180px;
  & .ContentCont {
    position: absolute;
    bottom: -40px;
    left: 0;
    height: 180px;
    width: 100%;
    background-color: $sec-color-trans-1;
    background-image: url("/defaults/pgs/orbrift_pfbg.jpg");
    background-blend-mode: overlay;
    background-attachment: fixed;
    overflow: hidden;
    z-index: 0;

    & .Img {
      position: absolute;
      left: -10px;
      bottom: -10px;
      height: 200px;
      width: 200px;
      // &::after {
      //   content: "";
      //   position: absolute;
      //   top: 0;
      //   bottom: 0;
      //   right: 0;
      //   left: 0;
      //   z-index: 1;
      //   background-color: transparent;
      // }
    }
  }
  & .Content {
    position: relative;
    padding: 0 20px;
    & .Text {
      text-align: center;
      padding-bottom: 70px;
      font-size: 30px;
      font-weight: bold;
      color: $pri-color;
    }
  }
}
.AB_MainBody {
  position: relative;
  z-index: 1;
}

@include xs-only {
  .ContentCont {
    & .Text {
      max-width: 180px !important;
    }
  }
}
</style>
