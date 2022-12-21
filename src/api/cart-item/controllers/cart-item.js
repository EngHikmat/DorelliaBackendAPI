"use strict";

/**
 * cart-item controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::cart-item.cart-item",
  ({ strapi }) => ({
    // async find(ctx) {
    //   try {
    //     const user = ctx.state.user;
    //     // const data = await strapi.db
    //     //   .query("api::cart-item.cart-item")
    //     //   .findMany({
    //     //     where: {
    //     //       users_permissions_user: {
    //     //         id: user.id,
    //     //       },
    //     //     },
    //     //     populate: ["image"],
    //     //     offset: 0,
    //     //     limit: 10,
    //     //   });

    //     const data = await strapi.entityService.findMany(
    //       "api::cart-item.cart-item",
    //       {
    //         filters: {
    //           users_permissions_user: {
    //             id: user.id,
    //           },
    //         },
    //         populate: ["image"],
    //         start: 0,
    //         limit: 15,
    //       }
    //     );
    //     return { data };
    //   } catch (err) {
    //     ctx.body = err;
    //   }
    // },

    async create(ctx) {
      try {
        const user = ctx.state.user;
        ctx.request.body.data.users_permissions_user = user.id;
        const datas = await strapi.entityService.create(
          "api::cart-item.cart-item",
          {
            ...ctx.request.body,
          }
        );
        return datas;
      } catch (err) {
        ctx.body = err;
      }
    },
    async delete(ctx) {
      try {
        const user = ctx.state.user;
        const { id } = ctx.params;

        const experienceData = await strapi.entityService.findMany(
          "api::cart-item.cart-item",
          {
            filters: {
              users_permissions_user: {
                id: user.id,
              },
              id: id,
            },
          }
        );

        if (experienceData.length === 0) {
          return {
            data: null,
            error: {
              message: "Not Found Or Not Allowed To Delete This Item",
            },
          };
        }

        const datas = await strapi.entityService.delete(
          "api::cart-item.cart-item",
          id
        );
        return datas;
      } catch (err) {
        ctx.body = err;
      }
    },
  })
);
