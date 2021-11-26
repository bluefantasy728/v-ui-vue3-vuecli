<template>
  <div class="v-button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'v-button-group',
};
</script>

<style scoped lang="scss">
.v-button-group {
  display: inline-flex;
  .v-button {
    border-radius: 0;
    &:nth-of-type(1) {
      border-top-left-radius: var(--button-radius);
      border-bottom-left-radius: var(--button-radius);
    }
    &:nth-last-of-type(1) {
      border-top-right-radius: var(--button-radius);
      border-bottom-right-radius: var(--button-radius);
    }
    &:not(:nth-of-type(1)) {
      margin-left: -1px;
    }
    &:hover {
      position: relative;
      z-index: 1;
    }
  }
}
</style>