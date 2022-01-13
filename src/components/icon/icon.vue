<template>
  <svg :class="`v-icon v-icon-${name}`">
    <use :xlink:href="`#i-${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'v-icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.v-icon {
  display: inline-block;
  vertical-align: middle;
  width: 1em;
  height: 1em;
}
</style>