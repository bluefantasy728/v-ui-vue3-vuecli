<template>
  <svg class="v-icon">
    <use :xlink:href="`#i-${name}`" />
  </svg>
</template>

<script>
export default {
  name: "v-icon",
  props: {
    name: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.v-icon {
  width: 1em;
  height: 1em;
}
</style>