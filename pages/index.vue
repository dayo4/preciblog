<template>
  <div>
    <section class="Top noselect">
      <div ref="homeTopBgParallax" class="Parall bg-img-masked"></div>
      <div
        class="Detail flex flex-wrap md:flex-nowrap md:mx-12 lg:mx-16 mt-14 md:mt-32 justify-center noselect br1"
      >
        <!-- Intro -->
        <div
          class="Intro basis-10/12 md:basis-2/3 lg:basis-1/2 text-center md:text-left"
        >
          <h2 class="Welcome">
            Welcome<span class="text-my-pri-color font-bold">!</span>
          </h2>
          <h5 class="MyName">to Precious Adeniyi's Blog</h5>
          <h3 class="Sdesc">Inspiring Contents on Pharmaceutical Chemistry</h3>
          <!-- <h5 class="Targ">For Creative Brands</h5> -->
        </div>

        <!-- image -->
        <div
          class="Img flex md:basis-1/3 lg:basis-1/2 md:mt-0 justify-center align-middle mb-9"
        >
          <div class="max-h-[320px] max-w-[320px]">
            <img
            class="rounded-ful h-full w-full"
              :src="author?.image.fields.file.url"
              :alt="author?.image.fields.file.title"
              draggable="false"
            />
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="d-flex j-c-center my-10">
        <Button @clicked="$router.push({ path: '/about' })" size="large">
          Know About Me
        </Button>
      </div>
    </section>

    <section class="SubText d-flex j-c-center">
      <div class="xs12 sm9 md4">
        <!-- Your Online Profile, Simplified and Elevated. Let's do it -->
      </div>
    </section>

    <section class="Section_2">
      <h3 class="SectionSubHead mb-6 font-bold text-[32px] ml-5 mt-16">
        <span> Featured Posts </span>
      </h3>
      <div class="Posts bg-img-masked flex flex-wrap justify-center py-4">
        <section v-if="posts && posts.length > 0" class="px-6">
          <FeaturedPosts
            :posts="posts"
            :pagin="pagin"
            @switchPage="switchPage"
          />
        </section>
      </div>

      <div class="d-flex j-c-center mt-6">
        <Button
          @clicked="
            $router.push({
              name: 'about',
            })
          "
          size="medium"
          icon="icon-right"
          iconPos="right"
        >
          See All Posts
        </Button>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { usePosts,  useCMS} from "@/store";

export default {
  name: "Home",

  setup() {
    const $Posts = usePosts();
    const $CMS = useCMS();
    const runtimeConfig = useRuntimeConfig();
    const { $myMetaInfo } = useNuxtApp();

    useSeoMeta($myMetaInfo({}));

    const homeTopBgParallax = ref(null);

    const pagin = ref({
      pages: 1,
      current: 1,
    });

    const { data, error, pending } = useAsyncData(async () => {
      
      const author =  await $CMS.getAuthor(runtimeConfig);
      const posts = await $Posts.getPosts(runtimeConfig);
      // console.log(author) 
      return {
        author,
        posts
      }
    });

    const posts = computed(() => {
      if (data.value?.posts) {
          // console.log(data.value.posts)
        $Posts.setPosts(data.value.posts);
        return data.value.posts;
      }
    });

    const author = computed(() => {
      if (data.value) {
        console.log(data.value.author[0])
        // $CMS.setAuthor(data.value.author[0]);
        return data.value.author[0];
      }
    });

    const switchPage = (v: number) => {};
    /* Element Refs */

    /* Other Static properties  */

    // onMounted(() => {
    //         $Navs.setParallaxElemHome1(homeTopBgParallax.value)
    // });

    // onUnmounted(() => { });

    return {
      homeTopBgParallax,
      pagin,
      posts,
      author,
      error,
      switchPage,
    };
  },
};
</script>
<style lang="scss" scoped>
.SubText {
  text-align: center;
  font-size: 24px;
  color: $pri-color;
  background-color: $sec-color-trans;
  padding: 15px;
  margin-bottom: 40px;
}

.SectionSubHead {
  position: relative;
  color: $blue-grey;
  &::after {
    content: "";
    height: 3px;
    width: 100px;
    position: absolute;
    bottom: -5px;
    // left: calc(50% - 35px);
    left: 0;
    background-color: $pri-color;
  }
  &::before {
    content: "";
    height: 3px;
    width: 100px;
    position: absolute;
    top: -5px;
    // left: calc(50% - 35px);
    left: 0;
    background-color: $pri-color;
  }
}

.Top {
  position: relative;
  overflow: hidden;
  min-height: 500px;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 20px;
  // margin-bottom: 50px;
  // background-color: $sec-color;
  // background-image: url("/defaults/pgs/orbrift_web_design_and_development.jpg");
  // background-attachment: fixed;
  & .Parall {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $sec-color;
    background-image: url("/defaults/pgs/orbrift_web_design_and_development.jpg");
    background-attachment: fixed;
  }
  & .Detail {
    // position: relative;
    z-index: 1;
    & .Intro {
      padding: 5px 0 0 0;
      & > div {
        letter-spacing: 1px;
        font-weight: bold;
      }
      & > .Welcome {
        position: relative;
        // color: rgba(204, 235, 238, 0.7);
        color: white;
        font-size: 45px;
        margin-bottom: 0;
      }
      & > .MyName {
        position: relative;
        color: white;
        font-size: 30px;
        margin-top: 10px;
        margin-bottom: 0;
        z-index: 0;
        &::after {
          position: absolute;
          content: "";
          bottom: 2px;
          left: 0;
          margin-left: 38px;
          width: 255px;
          height: 17px;
          background-color: $pri-color-trans-2;
          z-index: -1;
        }
      }
      & > .Sdesc {
        position: relative;
        color: $pri-color;
        font-size: 25px;
        margin-top: 50px;
        margin-bottom: 8px;
        // padding: 0 10px;
      }
      & > .Targ {
        position: relative;
        font-size: 20px;
        margin-top: 0px;
        color: $light-color;
      }
    }

    & .Img {
      position: relative;
      & img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  & button {
    margin-top: 40px;
    z-index: 2;
  }
}

.Section_2 {
  margin-bottom: 50px;

  .Posts {
    background-color: $sec-color;
    background-attachment: fixed;
    background-image: url("/defaults/pgs/orbrift_pfbg.jpg");
  }
}

@include sm-and-down {
  .Top {
    & .Detail {
      .Intro {
        // text-align: center;

        .MyName {
          &::after {
            position: absolute;
            content: "";
            bottom: 2px;
            left: 50%;
            margin-left: -145px;
            width: 255px;
          }
        }
      }
      & .Img {
        position: relative;
        top: 40px;
      }
    }
  }
}

@include xs-only {
  .Top {
    .Detail {
      & .Intro {
        & > .Welcome {
          font-size: 28px;
        }
        & > .Sdesc {
          font-size: 28px;
        }
      }
    }
  }

  // .Section_2 {

  // }
}
@include xxs-only {
  // .Section_2 {

  // }
}
</style>
