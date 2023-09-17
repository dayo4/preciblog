import { defineStore } from "pinia";
import { createClient } from "contentful";
import contentful from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

interface CMS {
  client: any;
  author: any;
}

export const useCMS = defineStore("cms", {
  state: (): CMS => ({
    client: null,
    author: null,
  }),

  actions: {
    async initClient(runtimeConfig) {
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

      return this.client;
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

    getClient() {
      return this.client;
    },
  },
});
