module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/helper.scss";
          @import "@/style/var.scss";
          @import "@/style/theme.scss";
          @import "@/style/mixin.scss";
        `,
      },
    },
  },
}
