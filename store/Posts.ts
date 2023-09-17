interface Posts {
  posts: [Object] | any;
  prevPost: Object | any;
  nextPost: Object | any;
  client: any;
  author: any;
}
import { defineStore } from "pinia";
import { createClient } from "contentful";
import contentful from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export const usePosts = defineStore("posts", {
  state: (): Posts => ({
    posts: [],
    prevPost: null,
    nextPost: null,
    client: null,
    author: null,
  }),

  actions: {
    async getPosts(runtimeConfig) {
      if (!this.client) {
        const crClient =
          process.env.NODE_ENV === "development"
            ? createClient
            : contentful.createClient;

        this.client = crClient({
          space: runtimeConfig.public.contentfulSpaceId,
          environment: "master",
          accessToken: runtimeConfig.public.contentfulDeliveryKey,
        });
      }

      if (this.posts?.length > 0) {
        return this.posts;
      } else {
        const { items } = await this.client.getEntries({
          content_type: "blogPost",
          limit: 10,
          select: [
            "fields.title",
            "fields.featuredImage",
            "fields.content",
            "fields.excerpt",
            "fields.slug",
            "fields.title",
            "metadata.tags",
          ],
          order: ["-sys.createdAt"],
        });

        return items.map((item, i) => {
          const { title, slug, content, excerpt, featuredImage } = item.fields;
          const options = {
            renderNode: {
              "embedded-asset-block": (node) => {
                // Handle embedded assets (images, videos, etc.)
                return `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.file.url}" />`;
              },
              // You can add more custom renderers for other node types as needed
            },
          };
          return {
            title,
            slug,
            content: documentToHtmlString(content, options),
            excerpt,
            images: featuredImage,
            tags: item.metadata.tags,
          };
        });
      }
    },
    async getAuthor(runtimeConfig) {
      if (!this.client) {
        const crClient =
          process.env.NODE_ENV === "development"
            ? createClient
            : contentful.createClient;

        this.client = crClient({
          space: runtimeConfig.public.contentfulSpaceId,
          environment: "master",
          accessToken: runtimeConfig.public.contentfulDeliveryKey,
        });
      }

      if (this.author) {
        return this.author;
      } else {
        const { items } = await this.client.getEntries({
          content_type: "authorData",
          limit: 1,
          select: [
            "fields.image",
            "fields.about",
            "fields.firstName",
            "fields.lastName",
          ],
        });

        return items.map((item, i) => {
          const { image, about, firstName, lastName } = item.fields;
          const options = {
            renderNode: {
              "embedded-asset-block": (node) => {
                // Handle embedded assets (images, videos, etc.)
                return `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.file.url}" />`;
              },
              // You can add more custom renderers for other node types as needed
            },
          };

          return {
            image,
            about: documentToHtmlString(about, options),
            firstName,
            lastName,
          };
        });
      }
    },
    setAuthor(value: [Object] | any) {
      this.author = value;
    },
    setPosts(value: [Object] | any) {
      this.posts = value;
    },
    setPrevPost(value: Object | null) {
      this.prevPost = value;
    },
    setNextPost(value: Object | null) {
      this.nextPost = value;
    },
  },
});
